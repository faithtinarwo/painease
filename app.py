import streamlit as st
import pandas as pd
import numpy as np
import time
from datetime import datetime, timedelta
import plotly.express as px
import plotly.graph_objects as go
from PIL import Image
import io
import base64

# Page configuration
st.set_page_config(
    page_title="HealthVerify - Patient Eligibility System",
    page_icon="🏥",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for healthcare theme
st.markdown("""
<style>
    /* Main theme colors */
    :root {
        --primary-color: #1ABC9C;
        --secondary-color: #274754;
        --success-color: #27AE60;
        --warning-color: #F39C12;
        --danger-color: #E74C3C;
        --background-color: #F8FAFC;
    }
    
    /* Header styling */
    .main-header {
        background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        margin-bottom: 2rem;
    }
    
    /* Metric cards */
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid var(--primary-color);
        margin-bottom: 1rem;
    }
    
    /* Status badges */
    .status-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 9999px;
        color: white;
        font-size: 0.75rem;
        font-weight: 600;
        display: inline-block;
        margin: 0.25rem;
    }
    
    .status-citizen { background-color: var(--success-color); }
    .status-legal { background-color: var(--primary-color); }
    .status-undocumented { background-color: var(--danger-color); }
    .status-review { background-color: var(--warning-color); }
    
    /* Alert boxes */
    .alert-box {
        padding: 1rem;
        border-radius: 8px;
        margin: 1rem 0;
        border: 1px solid;
    }
    
    .alert-success {
        background-color: #D4EDDA;
        border-color: #C3E6CB;
        color: #155724;
    }
    
    .alert-warning {
        background-color: #FFF3CD;
        border-color: #FFEAA7;
        color: #856404;
    }
    
    .alert-danger {
        background-color: #F8D7DA;
        border-color: #F5C6CB;
        color: #721C24;
    }
    
    /* Navigation styling */
    .nav-item {
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        border-radius: 8px;
        background: white;
        border: 1px solid #E2E8F0;
        cursor: pointer;
        transition: all 0.2s;
    }
    
    .nav-item:hover {
        background: var(--primary-color);
        color: white;
    }
    
    .nav-item.active {
        background: var(--primary-color);
        color: white;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = 'home'
if 'verification_results' not in st.session_state:
    st.session_state.verification_results = []
if 'alerts' not in st.session_state:
    st.session_state.alerts = []

# Sidebar Navigation
with st.sidebar:
    st.markdown("""
    <div style="text-align: center; padding: 1rem;">
        <h2>🏥 Batho Pele</h2>
        <p style="color: #64748B; font-size: 0.9rem;">Healthcare Eligibility System</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Navigation buttons
    if st.button("🏠 Home Dashboard", use_container_width=True):
        st.session_state.current_page = 'home'
    if st.button("🔍 Patient Verification", use_container_width=True):
        st.session_state.current_page = 'verify'
    if st.button("📊 Admin Dashboard", use_container_width=True):
        st.session_state.current_page = 'admin'
    if st.button("🚨 Alerts & Reports", use_container_width=True):
        st.session_state.current_page = 'alerts'
    
    st.markdown("---")
    
    # System status
    st.markdown("### System Status")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Uptime", "99.9%", "0.1%")
    with col2:
        st.metric("Load", "45%", "-5%")

# Helper functions
def create_verification_result(patient_id, doc_type, category, confidence):
    """Create a mock verification result"""
    eligibility_map = {
        'citizen': 'free_care',
        'legal_immigrant': 'partial_payment',
        'undocumented': 'manual_review'
    }
    
    return {
        'id': f"VER-{len(st.session_state.verification_results):03d}",
        'patient_id': patient_id,
        'document_type': doc_type,
        'category': category,
        'confidence': confidence,
        'eligibility': eligibility_map.get(category, 'manual_review'),
        'timestamp': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'status': 'completed' if confidence > 70 else 'review_pending',
        'document_valid': confidence > 60,
        'red_flags': [] if confidence > 80 else ['Low confidence score']
    }

def get_status_badge(status):
    """Generate HTML for status badges"""
    status_classes = {
        'citizen': 'status-citizen',
        'legal_immigrant': 'status-legal',
        'undocumented': 'status-undocumented',
        'free_care': 'status-citizen',
        'partial_payment': 'status-legal',
        'full_payment': 'status-undocumented',
        'manual_review': 'status-review'
    }
    
    status_labels = {
        'citizen': 'SA Citizen',
        'legal_immigrant': 'Legal Immigrant',
        'undocumented': 'Undocumented',
        'free_care': 'Free Care',
        'partial_payment': 'Partial Payment',
        'full_payment': 'Full Payment',
        'manual_review': 'Manual Review'
    }
    
    css_class = status_classes.get(status, 'status-review')
    label = status_labels.get(status, status.title())
    
    return f'<span class="status-badge {css_class}">{label}</span>'

# Main content based on selected page
if st.session_state.current_page == 'home':
    # HOME PAGE
    st.markdown("""
    <div class="main-header">
        <h1>🏥 Batho Pele Healthcare Eligibility System</h1>
        <p>AI-powered patient verification supporting public hospitals in South Africa</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="📋 Today's Verifications",
            value="247",
            delta="12"
        )
    
    with col2:
        st.metric(
            label="✅ Citizens Verified",
            value="189",
            delta="8"
        )
    
    with col3:
        st.metric(
            label="🚨 Red Flags",
            value="12",
            delta="-5"
        )
    
    with col4:
        st.metric(
            label="⚡ System Uptime",
            value="99.9%",
            delta="0.0%"
        )
    
    # Problem and Solution
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 🔍 The Challenge")
        st.markdown("""
        - **Overwhelmed Resources**: Public hospitals face bed shortages and medicine stock-outs
        - **Unverified Patients**: Lack of proper verification systems
        - **Inequitable Care**: Limited resources aren't distributed fairly
        """)
    
    with col2:
        st.markdown("### 💡 Our Solution")
        st.markdown("""
        - **Smart Verification**: AI-powered document scanning and validation
        - **Fair Classification**: Intelligent patient categorization
        - **POPIA Compliant**: Secure data handling meeting SA privacy regulations
        """)
    
    # UN SDG Alignment
    st.markdown("### 🌍 UN Sustainable Development Goals")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.info("**SDG 3**: Good Health & Well-being")
    with col2:
        st.info("**SDG 10**: Reduced Inequalities")
    with col3:
        st.info("**SDG 16**: Strong Institutions")
    
    # Recent activity chart
    st.markdown("### 📈 Verification Trends")
    
    # Generate sample data
    dates = pd.date_range(start='2024-01-01', end='2024-01-15', freq='D')
    data = {
        'Date': dates,
        'Citizens': np.random.randint(150, 200, len(dates)),
        'Legal Immigrants': np.random.randint(30, 60, len(dates)),
        'Undocumented': np.random.randint(5, 25, len(dates))
    }
    df = pd.DataFrame(data)
    
    fig = px.line(df, x='Date', y=['Citizens', 'Legal Immigrants', 'Undocumented'],
                  title="Daily Verification Counts by Category")
    fig.update_layout(yaxis_title="Number of Verifications")
    st.plotly_chart(fig, use_container_width=True)

elif st.session_state.current_page == 'verify':
    # PATIENT VERIFICATION PAGE
    st.title("🔍 Patient Verification System")
    
    # Verification form
    with st.form("verification_form"):
        st.markdown("### Upload Patient Document")
        
        col1, col2 = st.columns(2)
        
        with col1:
            doc_type = st.selectbox(
                "Document Type",
                ["South African ID", "Passport", "Asylum Seeker Permit", "Refugee ID", "Work Permit"]
            )
            
            patient_id = st.text_input(
                "Patient ID/Document Number",
                placeholder="Enter document number..."
            )
        
        with col2:
            uploaded_file = st.file_uploader(
                "Upload Document Image",
                type=['png', 'jpg', 'jpeg', 'pdf'],
                help="Supported formats: PNG, JPG, PDF (Max 10MB)"
            )
            
            # Camera input option
            camera_image = st.camera_input("Or take a photo")
        
        submitted = st.form_submit_button("🔍 Verify Document", type="primary")
        
        if submitted and (uploaded_file or camera_image) and patient_id:
            # Show processing
            progress_bar = st.progress(0)
            status_text = st.empty()
            
            # Simulate AI processing
            steps = [
                "📤 Uploading document...",
                "🔍 Scanning and extracting data...",
                "✅ Validating document authenticity...",
                "🤖 Running AI classification...",
                "📊 Determining eligibility..."
            ]
            
            for i, step in enumerate(steps):
                status_text.text(step)
                time.sleep(0.5)
                progress_bar.progress((i + 1) / len(steps))
            
            # Generate mock result
            categories = ['citizen', 'legal_immigrant', 'undocumented']
            weights = [0.6, 0.3, 0.1]  # More likely to be citizen
            category = np.random.choice(categories, p=weights)
            confidence = np.random.randint(70, 99)
            
            result = create_verification_result(patient_id, doc_type, category, confidence)
            st.session_state.verification_results.append(result)
            
            # Clear progress indicators
            progress_bar.empty()
            status_text.empty()
            
            # Show results
            st.success("✅ Verification Complete!")
            
            # Results display
            col1, col2 = st.columns(2)
            
            with col1:
                st.markdown("#### Patient Classification")
                st.markdown(get_status_badge(result['category']), unsafe_allow_html=True)
                
                st.markdown("#### Document Validity")
                if result['document_valid']:
                    st.success("✅ Valid Document")
                else:
                    st.error("❌ Invalid Document")
            
            with col2:
                st.markdown("#### Confidence Level")
                st.progress(result['confidence'] / 100)
                st.write(f"{result['confidence']}%")
                
                st.markdown("#### Eligibility Status")
                st.markdown(get_status_badge(result['eligibility']), unsafe_allow_html=True)
            
            # Eligibility explanation
            eligibility_info = {
                'free_care': ('💚', 'Eligible for Free Healthcare', 'Patient qualifies for free public healthcare services'),
                'partial_payment': ('💛', 'Partial Payment Required', 'Patient should pay reduced fees for services'),
                'full_payment': ('❤️', 'Full Payment Required', 'Patient must pay full fees for all services'),
                'manual_review': ('🔍', 'Manual Review Required', 'Case needs administrator evaluation')
            }
            
            icon, title, description = eligibility_info[result['eligibility']]
            st.markdown(f"""
            <div class="alert-box alert-success">
                <h4>{icon} {title}</h4>
                <p>{description}</p>
            </div>
            """, unsafe_allow_html=True)
            
            # Red flags if any
            if result['red_flags']:
                st.markdown("""
                <div class="alert-box alert-warning">
                    <h4>⚠️ Attention Required</h4>
                    <ul>
                """, unsafe_allow_html=True)
                for flag in result['red_flags']:
                    st.markdown(f"<li>{flag}</li>", unsafe_allow_html=True)
                st.markdown("</ul></div>", unsafe_allow_html=True)

elif st.session_state.current_page == 'admin':
    # ADMIN DASHBOARD PAGE
    st.title("📊 Admin Dashboard")
    
    # Overview metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Verifications", "2,347", "+127")
    with col2:
        st.metric("Success Rate", "94.2%", "+2.1%")
    with col3:
        st.metric("Avg. Processing Time", "3.2s", "-0.5s")
    with col4:
        st.metric("Active Users", "89", "+12")
    
    # Charts
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Verification by Category")
        
        # Pie chart data
        categories = ['Citizens', 'Legal Immigrants', 'Undocumented', 'Under Review']
        values = [189, 45, 13, 8]
        
        fig = px.pie(values=values, names=categories, title="Patient Categories")
        fig.update_traces(textposition='inside', textinfo='percent+label')
        st.plotly_chart(fig, use_container_width=True)
    
    with col2:
        st.markdown("#### System Performance")
        
        # Performance metrics over time
        hours = list(range(24))
        cpu_usage = [np.random.randint(30, 70) for _ in hours]
        memory_usage = [np.random.randint(40, 80) for _ in hours]
        
        fig = go.Figure()
        fig.add_trace(go.Scatter(x=hours, y=cpu_usage, mode='lines', name='CPU Usage', line=dict(color='#1ABC9C')))
        fig.add_trace(go.Scatter(x=hours, y=memory_usage, mode='lines', name='Memory Usage', line=dict(color='#E74C3C')))
        fig.update_layout(title="24-Hour System Performance", xaxis_title="Hour", yaxis_title="Usage %")
        st.plotly_chart(fig, use_container_width=True)
    
    # Recent verifications table
    st.markdown("#### Recent Verifications")
    
    if st.session_state.verification_results:
        df = pd.DataFrame(st.session_state.verification_results)
        
        # Format the dataframe for display
        display_df = df[['id', 'patient_id', 'category', 'eligibility', 'confidence', 'status', 'timestamp']].copy()
        display_df.columns = ['Verification ID', 'Patient ID', 'Category', 'Eligibility', 'Confidence', 'Status', 'Timestamp']
        
        st.dataframe(display_df, use_container_width=True)
    else:
        st.info("No verifications performed yet. Go to the Verification page to process patients.")
    
    # Quick actions
    st.markdown("#### Quick Actions")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        if st.button("📥 Export Data", use_container_width=True):
            if st.session_state.verification_results:
                csv = pd.DataFrame(st.session_state.verification_results).to_csv(index=False)
                st.download_button(
                    label="Download CSV",
                    data=csv,
                    file_name=f"verifications_{datetime.now().strftime('%Y%m%d')}.csv",
                    mime="text/csv"
                )
            else:
                st.warning("No data to export")
    
    with col2:
        if st.button("🔄 System Maintenance", use_container_width=True):
            st.info("Maintenance mode activated")
    
    with col3:
        if st.button("👥 Manage Users", use_container_width=True):
            st.info("User management panel (placeholder)")

elif st.session_state.current_page == 'alerts':
    # ALERTS AND REPORTS PAGE
    st.title("🚨 Alerts & System Reports")
    
    # Alert types
    alert_types = {
        'fraud': {'icon': '🔴', 'title': 'Fraud Detection', 'count': 3},
        'system': {'icon': '🔧', 'title': 'System Issues', 'count': 1},
        'quota': {'icon': '📊', 'title': 'Quota Warnings', 'count': 2}
    }
    
    col1, col2, col3 = st.columns(3)
    
    for i, (alert_type, info) in enumerate(alert_types.items()):
        with [col1, col2, col3][i]:
            st.metric(
                label=f"{info['icon']} {info['title']}",
                value=info['count']
            )
    
    # Sample alerts
    alerts = [
        {
            'type': 'fraud',
            'severity': 'high',
            'message': 'Duplicate document detected for patient SA8901234567890',
            'timestamp': '2024-01-15 09:15'
        },
        {
            'type': 'system',
            'severity': 'medium',
            'message': 'Document scanner maintenance scheduled for 15:00',
            'timestamp': '2024-01-15 08:30'
        },
        {
            'type': 'quota',
            'severity': 'low',
            'message': 'Daily verification quota 80% reached',
            'timestamp': '2024-01-15 08:00'
        }
    ]
    
    st.markdown("#### Active Alerts")
    
    for alert in alerts:
        severity_colors = {
            'high': 'alert-danger',
            'medium': 'alert-warning',
            'low': 'alert-success'
        }
        
        st.markdown(f"""
        <div class="alert-box {severity_colors[alert['severity']]}">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <strong>{alert['message']}</strong>
                    <br><small>🕒 {alert['timestamp']}</small>
                </div>
                <span class="status-badge status-{'undocumented' if alert['severity']=='high' else 'review'}">{alert['severity'].upper()}</span>
            </div>
        </div>
        """, unsafe_allow_html=True)
    
    # Reports section
    st.markdown("#### Generate Reports")
    
    col1, col2 = st.columns(2)
    
    with col1:
        report_type = st.selectbox(
            "Report Type",
            ["Daily Summary", "Weekly Analysis", "Monthly Overview", "Fraud Detection", "System Performance"]
        )
        
        date_range = st.date_input(
            "Date Range",
            value=[datetime.now().date() - timedelta(days=7), datetime.now().date()],
            max_value=datetime.now().date()
        )
    
    with col2:
        format_type = st.selectbox("Format", ["PDF", "Excel", "CSV"])
        
        if st.button("📋 Generate Report", type="primary", use_container_width=True):
            st.success(f"✅ {report_type} report generated successfully!")
            st.info(f"Report format: {format_type} | Date range: {date_range[0]} to {date_range[1]}")

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #64748B; padding: 1rem;">
    <p>🏥 Batho Pele Healthcare Eligibility System | POPIA Compliant | 
    Supporting UN SDG Goals 3, 10 & 16</p>
    <p><small>© 2024 Batho Pele. All rights reserved.</small></p>
</div>
""", unsafe_allow_html=True)
