"""
Data Management Utilities for HealthVerify Patient Eligibility System
Handles data storage, retrieval, and privacy compliance
"""

import pandas as pd
import json
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Optional
import hashlib
import uuid
from pathlib import Path

class SecureDataManager:
    """Privacy-compliant data management system"""
    
    def __init__(self, db_path: str = "healthcare_data.db"):
        self.db_path = db_path
        self.init_database()
        
                # Privacy compliance settings
        self.data_retention_days = 2555  # 7 years as per privacy regulations
        self.anonymization_required = True
        self.audit_logging = True
    
    def init_database(self):
        """Initialize SQLite database with required tables"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Verifications table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS verifications (
            id TEXT PRIMARY KEY,
            patient_id_hash TEXT NOT NULL,
            document_type TEXT NOT NULL,
            category TEXT NOT NULL,
            eligibility TEXT NOT NULL,
            confidence INTEGER NOT NULL,
            document_valid BOOLEAN NOT NULL,
            red_flags TEXT,
            created_timestamp TEXT NOT NULL,
            expiry_date TEXT NOT NULL
        )
        ''')
        
        # Audit log table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS audit_log (
            id TEXT PRIMARY KEY,
            action TEXT NOT NULL,
            user_id TEXT,
            patient_id_hash TEXT,
            timestamp TEXT NOT NULL,
            ip_address TEXT,
            details TEXT
        )
        ''')
        
        # System metrics table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS system_metrics (
            id TEXT PRIMARY KEY,
            metric_name TEXT NOT NULL,
            metric_value REAL NOT NULL,
            timestamp TEXT NOT NULL
        )
        ''')
        
        # Alerts table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS alerts (
            id TEXT PRIMARY KEY,
            alert_type TEXT NOT NULL,
            severity TEXT NOT NULL,
            message TEXT NOT NULL,
            resolved BOOLEAN DEFAULT FALSE,
            created_timestamp TEXT NOT NULL
        )
        ''')
        
        conn.commit()
        conn.close()
    
    def hash_patient_id(self, patient_id: str) -> str:
        """Hash patient ID for privacy protection"""
        # Use SHA-256 with salt for patient ID hashing
        salt = "batho_pele_2024"  # In production, use environment variable
        return hashlib.sha256(f"{patient_id}{salt}".encode()).hexdigest()
    
    def store_verification(self, verification_data: Dict) -> str:
        """Store verification result with POPIA compliance"""
        verification_id = str(uuid.uuid4())
        
        # Hash sensitive data
        patient_id_hash = self.hash_patient_id(verification_data.get('patient_id', ''))
        
        # Calculate expiry date (7 years from now)
        expiry_date = (datetime.now() + timedelta(days=self.data_retention_days)).isoformat()
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        INSERT INTO verifications 
        (id, patient_id_hash, document_type, category, eligibility, 
         confidence, document_valid, red_flags, created_timestamp, expiry_date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', (
            verification_id,
            patient_id_hash,
            verification_data.get('document_type', ''),
            verification_data.get('category', ''),
            verification_data.get('eligibility', ''),
            verification_data.get('confidence', 0),
            verification_data.get('document_valid', False),
            json.dumps(verification_data.get('red_flags', [])),
            datetime.now().isoformat(),
            expiry_date
        ))
        
        conn.commit()
        conn.close()
        
        # Log the action
        self.log_action('store_verification', patient_id_hash=patient_id_hash)
        
        return verification_id
    
    def get_verification_history(self, limit: int = 100) -> List[Dict]:
        """Retrieve verification history (anonymized)"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        SELECT id, document_type, category, eligibility, confidence, 
               document_valid, red_flags, created_timestamp
        FROM verifications 
        ORDER BY created_timestamp DESC 
        LIMIT ?
        ''', (limit,))
        
        results = cursor.fetchall()
        conn.close()
        
        # Convert to list of dictionaries
        verifications = []
        for row in results:
            verification = {
                'id': row[0],
                'document_type': row[1],
                'category': row[2],
                'eligibility': row[3],
                'confidence': row[4],
                'document_valid': bool(row[5]),
                'red_flags': json.loads(row[6]) if row[6] else [],
                'created_timestamp': row[7]
            }
            verifications.append(verification)
        
        return verifications
    
    def get_analytics_data(self, days: int = 30) -> Dict:
        """Get analytics data for dashboard"""
        conn = sqlite3.connect(self.db_path)
        
        # Get verification counts by category
        category_df = pd.read_sql_query('''
        SELECT category, COUNT(*) as count
        FROM verifications 
        WHERE created_timestamp >= date('now', '-{} days')
        GROUP BY category
        '''.format(days), conn)
        
        # Get daily verification trends
        daily_df = pd.read_sql_query('''
        SELECT date(created_timestamp) as date, 
               category,
               COUNT(*) as count
        FROM verifications 
        WHERE created_timestamp >= date('now', '-{} days')
        GROUP BY date(created_timestamp), category
        ORDER BY date
        '''.format(days), conn)
        
        # Get confidence score distribution
        confidence_df = pd.read_sql_query('''
        SELECT 
            CASE 
                WHEN confidence >= 90 THEN 'High (90-100%)'
                WHEN confidence >= 70 THEN 'Medium (70-89%)'
                ELSE 'Low (<70%)'
            END as confidence_range,
            COUNT(*) as count
        FROM verifications 
        WHERE created_timestamp >= date('now', '-{} days')
        GROUP BY confidence_range
        '''.format(days), conn)
        
        # Get red flags summary
        red_flags_df = pd.read_sql_query('''
        SELECT red_flags, COUNT(*) as count
        FROM verifications 
        WHERE created_timestamp >= date('now', '-{} days')
        AND red_flags != '[]'
        '''.format(days), conn)
        
        conn.close()
        
        return {
            'category_distribution': category_df.to_dict('records'),
            'daily_trends': daily_df.to_dict('records'),
            'confidence_distribution': confidence_df.to_dict('records'),
            'red_flags_summary': red_flags_df.to_dict('records'),
            'total_verifications': len(daily_df)
        }
    
    def log_action(self, action: str, user_id: str = 'system', 
                   patient_id_hash: str = '', ip_address: str = '', 
                   details: str = ''):
        """Log user actions for audit trail"""
        if not self.audit_logging:
            return
        
        log_id = str(uuid.uuid4())
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        INSERT INTO audit_log 
        (id, action, user_id, patient_id_hash, timestamp, ip_address, details)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            log_id,
            action,
            user_id,
            patient_id_hash,
            datetime.now().isoformat(),
            ip_address,
            details
        ))
        
        conn.commit()
        conn.close()
    
    def create_alert(self, alert_type: str, severity: str, message: str):
        """Create system alert"""
        alert_id = str(uuid.uuid4())
        
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        INSERT INTO alerts (id, alert_type, severity, message, created_timestamp)
        VALUES (?, ?, ?, ?, ?)
        ''', (
            alert_id,
            alert_type,
            severity,
            message,
            datetime.now().isoformat()
        ))
        
        conn.commit()
        conn.close()
        
        return alert_id
    
    def get_active_alerts(self) -> List[Dict]:
        """Get unresolved alerts"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute('''
        SELECT id, alert_type, severity, message, created_timestamp
        FROM alerts 
        WHERE resolved = FALSE 
        ORDER BY created_timestamp DESC
        ''')
        
        results = cursor.fetchall()
        conn.close()
        
        alerts = []
        for row in results:
            alert = {
                'id': row[0],
                'type': row[1],
                'severity': row[2],
                'message': row[3],
                'timestamp': row[4]
            }
            alerts.append(alert)
        
        return alerts
    
    def cleanup_expired_data(self):
        """Remove data that has exceeded retention period"""
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        # Remove expired verifications
        cursor.execute('''
        DELETE FROM verifications 
        WHERE expiry_date < ?
        ''', (datetime.now().isoformat(),))
        
        expired_count = cursor.rowcount
        
        # Remove old audit logs (keep for 1 year)
        one_year_ago = (datetime.now() - timedelta(days=365)).isoformat()
        cursor.execute('''
        DELETE FROM audit_log 
        WHERE timestamp < ?
        ''', (one_year_ago,))
        
        audit_cleaned = cursor.rowcount
        
        conn.commit()
        conn.close()
        
        return {
            'expired_verifications_removed': expired_count,
            'old_audit_logs_removed': audit_cleaned
        }
    
    def export_data(self, table: str, format: str = 'csv') -> str:
        """Export data for reporting (anonymized)"""
        conn = sqlite3.connect(self.db_path)
        
        if table == 'verifications':
            # Export verification data without patient identifiers
            df = pd.read_sql_query('''
            SELECT id, document_type, category, eligibility, confidence, 
                   document_valid, created_timestamp
            FROM verifications
            ORDER BY created_timestamp DESC
            ''', conn)
        elif table == 'alerts':
            df = pd.read_sql_query('SELECT * FROM alerts', conn)
        else:
            raise ValueError(f"Unknown table: {table}")
        
        conn.close()
        
        # Generate filename with timestamp
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{table}_export_{timestamp}.{format}"
        
        if format == 'csv':
            df.to_csv(filename, index=False)
        elif format == 'excel':
            df.to_excel(filename, index=False)
        else:
            raise ValueError(f"Unsupported format: {format}")
        
        # Log the export action
        self.log_action('data_export', details=f"Exported {table} to {filename}")
        
        return filename

class ReportGenerator:
    """Generate compliance and analytics reports"""
    
    def __init__(self, data_manager: SecureDataManager):
        self.data_manager = data_manager
    
    def generate_daily_summary(self, date: str = None) -> Dict:
        """Generate daily summary report"""
        if date is None:
            date = datetime.now().strftime('%Y-%m-%d')
        
        conn = sqlite3.connect(self.data_manager.db_path)
        
        # Get daily statistics
        daily_stats = pd.read_sql_query('''
        SELECT 
            COUNT(*) as total_verifications,
            SUM(CASE WHEN category = 'citizen' THEN 1 ELSE 0 END) as citizens,
            SUM(CASE WHEN category = 'legal_immigrant' THEN 1 ELSE 0 END) as legal_immigrants,
            SUM(CASE WHEN category = 'undocumented' THEN 1 ELSE 0 END) as undocumented,
            SUM(CASE WHEN document_valid = 1 THEN 1 ELSE 0 END) as valid_documents,
            AVG(confidence) as avg_confidence
        FROM verifications 
        WHERE date(created_timestamp) = ?
        ''', conn, params=[date])
        
        conn.close()
        
        if daily_stats.empty:
            return {'date': date, 'no_data': True}
        
        stats = daily_stats.iloc[0].to_dict()
        stats['date'] = date
        stats['validity_rate'] = (stats['valid_documents'] / stats['total_verifications'] * 100) if stats['total_verifications'] > 0 else 0
        
        return stats
    
    def generate_fraud_report(self, days: int = 30) -> Dict:
        """Generate fraud detection report"""
        conn = sqlite3.connect(self.data_manager.db_path)
        
        # Get verifications with red flags
        fraud_data = pd.read_sql_query('''
        SELECT red_flags, created_timestamp, confidence, category
        FROM verifications 
        WHERE created_timestamp >= date('now', '-{} days')
        AND red_flags != '[]'
        '''.format(days), conn)
        
        conn.close()
        
        fraud_summary = {
            'total_flagged_cases': len(fraud_data),
            'fraud_rate': len(fraud_data) / max(1, len(fraud_data)) * 100,
            'common_flags': {},
            'risk_by_category': {}
        }
        
        # Analyze red flags
        all_flags = []
        for flags_json in fraud_data['red_flags']:
            flags = json.loads(flags_json)
            all_flags.extend(flags)
        
        # Count flag frequencies
        from collections import Counter
        flag_counts = Counter(all_flags)
        fraud_summary['common_flags'] = dict(flag_counts.most_common(10))
        
        # Risk by category
        category_risk = fraud_data.groupby('category').size().to_dict()
        fraud_summary['risk_by_category'] = category_risk
        
        return fraud_summary
    
    def generate_compliance_report(self) -> Dict:
        """Generate POPIA compliance report"""
        conn = sqlite3.connect(self.data_manager.db_path)
        
        # Data retention compliance
        retention_check = pd.read_sql_query('''
        SELECT 
            COUNT(*) as total_records,
            SUM(CASE WHEN expiry_date > datetime('now') THEN 1 ELSE 0 END) as within_retention,
            SUM(CASE WHEN expiry_date <= datetime('now') THEN 1 ELSE 0 END) as expired_records
        FROM verifications
        ''', conn)
        
        # Audit trail completeness
        audit_check = pd.read_sql_query('''
        SELECT COUNT(*) as audit_entries
        FROM audit_log 
        WHERE timestamp >= date('now', '-30 days')
        ''', conn)
        
        conn.close()
        
        retention_stats = retention_check.iloc[0].to_dict()
        audit_stats = audit_check.iloc[0].to_dict()
        
        compliance_score = 100  # Start with perfect score
        
        # Deduct points for compliance issues
        if retention_stats['expired_records'] > 0:
            compliance_score -= 10  # Deduct for expired data not cleaned
        
        if audit_stats['audit_entries'] == 0:
            compliance_score -= 20  # Deduct for missing audit trail
        
        return {
            'compliance_score': compliance_score,
            'data_retention': retention_stats,
            'audit_trail': audit_stats,
            'recommendations': self._get_compliance_recommendations(compliance_score)
        }
    
    def _get_compliance_recommendations(self, score: int) -> List[str]:
        """Get compliance improvement recommendations"""
        recommendations = []
        
        if score < 100:
            recommendations.append("Run automated data cleanup process")
        
        if score < 80:
            recommendations.append("Review audit logging configuration")
            recommendations.append("Implement additional data protection measures")
        
        if score < 60:
            recommendations.append("Conduct POPIA compliance training")
            recommendations.append("Review data handling procedures")
        
        return recommendations

# Utility functions for Streamlit integration
def get_sample_data() -> Dict:
    """Generate sample data for demo purposes"""
    np.random.seed(42)  # For reproducible demo data
    
    # Sample verification data
    verifications = []
    categories = ['citizen', 'legal_immigrant', 'undocumented']
    doc_types = ['South African ID', 'Passport', 'Asylum Permit', 'Work Permit']
    
    for i in range(50):
        verification = {
            'id': f'VER-{i:03d}',
            'patient_id': f'PAT-{i:03d}',
            'document_type': np.random.choice(doc_types),
            'category': np.random.choice(categories, p=[0.6, 0.3, 0.1]),
            'confidence': np.random.randint(60, 99),
            'timestamp': (datetime.now() - timedelta(days=np.random.randint(0, 30))).strftime('%Y-%m-%d %H:%M:%S'),
            'document_valid': np.random.choice([True, False], p=[0.9, 0.1]),
            'red_flags': [] if np.random.random() > 0.1 else ['Low confidence score']
        }
        
        # Set eligibility based on category
        eligibility_map = {
            'citizen': 'free_care',
            'legal_immigrant': 'partial_payment',
            'undocumented': 'manual_review'
        }
        verification['eligibility'] = eligibility_map[verification['category']]
        verification['status'] = 'completed' if verification['confidence'] > 70 else 'review_pending'
        
        verifications.append(verification)
    
    return {'verifications': verifications}
