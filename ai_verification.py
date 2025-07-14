"""
AI Verification Module for HealthVerify Patient Eligibility System
Handles document processing, validation, and patient classification
"""

import numpy as np
import cv2
from PIL import Image
import re
from datetime import datetime
from typing import Dict, List, Tuple, Optional

class DocumentVerifier:
    """AI-powered document verification system"""
    
    def __init__(self):
        self.supported_documents = {
            'south_african_id': {
                'pattern': r'^[0-9]{13}$',
                'validation_rules': ['length_13', 'luhn_check', 'date_validation']
            },
            'passport': {
                'pattern': r'^[A-Z]{1,2}[0-9]{6,9}$',
                'validation_rules': ['format_check', 'country_code']
            },
            'asylum_permit': {
                'pattern': r'^ASY[0-9]{6,}$',
                'validation_rules': ['format_check', 'validity_period']
            },
            'work_permit': {
                'pattern': r'^WP[0-9]{6,}$',
                'validation_rules': ['format_check', 'validity_period']
            }
        }
        
        # Mock AI model confidence factors
        self.confidence_factors = {
            'document_quality': 0.3,
            'text_clarity': 0.25,
            'security_features': 0.2,
            'format_compliance': 0.15,
            'database_match': 0.1
        }
    
    def preprocess_image(self, image: Image.Image) -> np.ndarray:
        """Preprocess uploaded image for OCR and analysis"""
        # Convert PIL image to OpenCV format
        img_array = np.array(image)
        
        # Convert to grayscale
        if len(img_array.shape) == 3:
            gray = cv2.cvtColor(img_array, cv2.COLOR_RGB2GRAY)
        else:
            gray = img_array
        
        # Apply noise reduction
        denoised = cv2.fastNlMeansDenoising(gray)
        
        # Enhance contrast
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8,8))
        enhanced = clahe.apply(denoised)
        
        return enhanced
    
    def extract_text_from_image(self, processed_image: np.ndarray) -> str:
        """Simulate OCR text extraction from document image"""
        # In a real implementation, this would use OCR libraries like Tesseract
        # For demo purposes, we'll simulate extracted text based on document type
        
        mock_extractions = [
            "8001015009087",  # SA ID number
            "M123456789",     # Passport number
            "ASY0123456",     # Asylum permit
            "WP9876543"       # Work permit
        ]
        
        # Randomly select one for simulation
        return np.random.choice(mock_extractions)
    
    def validate_sa_id(self, id_number: str) -> Tuple[bool, Dict]:
        """Validate South African ID number using Luhn algorithm"""
        if len(id_number) != 13 or not id_number.isdigit():
            return False, {'error': 'Invalid format'}
        
        # Extract date of birth
        birth_date = id_number[:6]
        try:
            year = int(birth_date[:2])
            month = int(birth_date[2:4])
            day = int(birth_date[4:6])
            
            # Determine century
            current_year = datetime.now().year % 100
            if year <= current_year:
                full_year = 2000 + year
            else:
                full_year = 1900 + year
            
            # Validate date
            birth_datetime = datetime(full_year, month, day)
            
        except ValueError:
            return False, {'error': 'Invalid birth date'}
        
        # Gender digit (7th digit)
        gender_digit = int(id_number[6])
        gender = 'male' if gender_digit >= 5 else 'female'
        
        # Citizenship (8th-10th digits)
        citizenship_code = id_number[7:10]
        citizenship = 'citizen' if citizenship_code[0] == '0' else 'permanent_resident'
        
        # Luhn algorithm check (simplified)
        check_digit = int(id_number[12])
        calculated_check = sum(int(d) for d in id_number[::2]) * 2
        calculated_check += sum(int(d) for d in id_number[1::2])
        calculated_check = (10 - (calculated_check % 10)) % 10
        
        luhn_valid = check_digit == calculated_check
        
        return luhn_valid, {
            'birth_date': birth_datetime.strftime('%Y-%m-%d'),
            'gender': gender,
            'citizenship': citizenship,
            'age': datetime.now().year - full_year
        }
    
    def classify_patient(self, document_info: Dict) -> Dict:
        """Classify patient based on document analysis"""
        
        if document_info.get('citizenship') == 'citizen':
            category = 'citizen'
            eligibility = 'free_care'
            confidence_boost = 15
        elif document_info.get('citizenship') == 'permanent_resident':
            category = 'legal_immigrant'
            eligibility = 'partial_payment'
            confidence_boost = 10
        else:
            category = 'undocumented'
            eligibility = 'manual_review'
            confidence_boost = -10
        
        # Base confidence calculation
        base_confidence = np.random.randint(60, 90)
        final_confidence = min(99, max(30, base_confidence + confidence_boost))
        
        return {
            'category': category,
            'eligibility': eligibility,
            'confidence': final_confidence,
            'classification_details': document_info
        }
    
    def detect_fraud_indicators(self, image: np.ndarray, extracted_text: str) -> List[str]:
        """Detect potential fraud indicators in document"""
        red_flags = []
        
        # Simulate fraud detection algorithms
        
        # Check image quality
        if np.mean(image) < 50:  # Too dark
            red_flags.append("Poor image quality detected")
        
        # Check for duplicate patterns (simplified)
        if len(set(extracted_text)) < 5:  # Too few unique characters
            red_flags.append("Suspicious character patterns")
        
        # Random fraud indicators for demo
        fraud_checks = [
            ("Potential digital manipulation detected", 0.05),
            ("Security watermark verification failed", 0.03),
            ("Database cross-reference inconsistency", 0.02),
            ("Unusual document wear patterns", 0.04)
        ]
        
        for flag, probability in fraud_checks:
            if np.random.random() < probability:
                red_flags.append(flag)
        
        return red_flags
    
    def verify_document(self, image: Image.Image, document_type: str) -> Dict:
        """Main verification pipeline"""
        try:
            # Preprocess image
            processed_image = self.preprocess_image(image)
            
            # Extract text
            extracted_text = self.extract_text_from_image(processed_image)
            
            # Validate based on document type
            if document_type.lower() in ['south african id', 'sa id']:
                is_valid, doc_info = self.validate_sa_id(extracted_text)
            else:
                # Simplified validation for other documents
                is_valid = bool(re.match(r'^[A-Z0-9]{6,13}$', extracted_text))
                doc_info = {'document_number': extracted_text}
            
            # Classify patient
            classification = self.classify_patient(doc_info)
            
            # Detect fraud indicators
            red_flags = self.detect_fraud_indicators(processed_image, extracted_text)
            
            # Compile results
            result = {
                'document_valid': is_valid,
                'extracted_text': extracted_text,
                'category': classification['category'],
                'eligibility': classification['eligibility'],
                'confidence': classification['confidence'],
                'red_flags': red_flags,
                'document_info': doc_info,
                'processing_timestamp': datetime.now().isoformat()
            }
            
            return result
            
        except Exception as e:
            return {
                'error': f"Verification failed: {str(e)}",
                'document_valid': False,
                'confidence': 0,
                'red_flags': ['Processing error occurred']
            }

class EligibilityEngine:
    """Healthcare eligibility determination engine"""
    
    def __init__(self):
        self.eligibility_rules = {
            'citizen': {
                'free_services': [
                    'emergency_care',
                    'primary_healthcare',
                    'maternal_care',
                    'child_immunization',
                    'tuberculosis_treatment',
                    'hiv_treatment'
                ],
                'fee_services': []
            },
            'legal_immigrant': {
                'free_services': [
                    'emergency_care',
                    'communicable_disease_treatment'
                ],
                'reduced_fee_services': [
                    'primary_healthcare',
                    'chronic_medication'
                ],
                'full_fee_services': [
                    'specialist_consultation',
                    'elective_surgery'
                ]
            },
            'undocumented': {
                'free_services': [
                    'emergency_care',
                    'communicable_disease_treatment'
                ],
                'full_fee_services': [
                    'primary_healthcare',
                    'specialist_consultation',
                    'chronic_medication',
                    'elective_surgery'
                ]
            }
        }
    
    def get_service_eligibility(self, patient_category: str, service_type: str) -> Dict:
        """Determine eligibility for specific healthcare service"""
        rules = self.eligibility_rules.get(patient_category, {})
        
        if service_type in rules.get('free_services', []):
            return {'eligible': True, 'payment_required': 'none', 'fee_percentage': 0}
        elif service_type in rules.get('reduced_fee_services', []):
            return {'eligible': True, 'payment_required': 'partial', 'fee_percentage': 50}
        elif service_type in rules.get('full_fee_services', []):
            return {'eligible': True, 'payment_required': 'full', 'fee_percentage': 100}
        else:
            return {'eligible': False, 'payment_required': 'review', 'fee_percentage': None}
    
    def calculate_estimated_cost(self, services: List[str], patient_category: str) -> Dict:
        """Calculate estimated healthcare costs for patient"""
        # Mock pricing data
        service_costs = {
            'emergency_care': 1500,
            'primary_healthcare': 300,
            'specialist_consultation': 800,
            'chronic_medication': 450,
            'maternal_care': 2000,
            'elective_surgery': 15000
        }
        
        total_cost = 0
        cost_breakdown = []
        
        for service in services:
            base_cost = service_costs.get(service, 500)
            eligibility = self.get_service_eligibility(patient_category, service)
            
            if eligibility['fee_percentage'] is not None:
                patient_cost = base_cost * (eligibility['fee_percentage'] / 100)
            else:
                patient_cost = base_cost  # Full cost if needs review
            
            total_cost += patient_cost
            cost_breakdown.append({
                'service': service,
                'base_cost': base_cost,
                'patient_cost': patient_cost,
                'coverage': eligibility['payment_required']
            })
        
        return {
            'total_estimated_cost': total_cost,
            'cost_breakdown': cost_breakdown,
            'currency': 'ZAR'
        }

# Helper functions for Streamlit integration
def get_verification_summary(result: Dict) -> str:
    """Generate human-readable verification summary"""
    if result.get('error'):
        return f"❌ Verification failed: {result['error']}"
    
    category_labels = {
        'citizen': '🇿🇦 South African Citizen',
        'legal_immigrant': '📄 Legal Immigrant',
        'undocumented': '❓ Undocumented Person'
    }
    
    eligibility_labels = {
        'free_care': '💚 Eligible for Free Healthcare',
        'partial_payment': '💛 Partial Payment Required',
        'full_payment': '❤️ Full Payment Required',
        'manual_review': '🔍 Manual Review Required'
    }
    
    category = result.get('category', 'unknown')
    eligibility = result.get('eligibility', 'manual_review')
    confidence = result.get('confidence', 0)
    
    summary = f"""
    **Patient Classification:** {category_labels.get(category, category)}
    **Healthcare Eligibility:** {eligibility_labels.get(eligibility, eligibility)}
    **Verification Confidence:** {confidence}%
    """
    
    if result.get('red_flags'):
        summary += f"\n**⚠️ Alerts:** {len(result['red_flags'])} issue(s) detected"
    
    return summary
