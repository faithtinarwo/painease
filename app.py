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
    page_title="PainEase - Pain Relief Assistant",
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
    
    /* Pain scale styling */
    .pain-scale {
        background: linear-gradient(90deg, #27AE60 0%, #F39C12 50%, #E74C3C 100%);
        height: 20px;
        border-radius: 10px;
        margin: 10px 0;
    }
    
    /* Relief technique cards */
    .relief-card {
        background: #f0f9ff;
        border: 1px solid #1ABC9C;
        border-radius: 10px;
        padding: 1rem;
        margin: 1rem 0;
    }
    
    /* Emergency alert */
    .emergency-alert {
        background: #fee2e2;
        border: 2px solid #E74C3C;
        border-radius: 10px;
        padding: 1rem;
        color: #991b1b;
        font-weight: bold;
    }
    
    /* Success message */
    .success-message {
        background: #dcfce7;
        border: 1px solid #27AE60;
        border-radius: 10px;
        padding: 1rem;
        color: #166534;
    }
    
    /* Guided session */
    .guided-session {
        background: #fef3c7;
        border: 1px solid #F39C12;
        border-radius: 10px;
        padding: 2rem;
        text-align: center;
        margin: 1rem 0;
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
    
    /* Hide streamlit branding */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    header {visibility: hidden;}
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'current_page' not in st.session_state:
    st.session_state.current_page = 'home'
if 'pain_assessment' not in st.session_state:
    st.session_state.pain_assessment = {}
if 'relief_sessions' not in st.session_state:
    st.session_state.relief_sessions = []
if 'session_active' not in st.session_state:
    st.session_state.session_active = False

# Pain relief techniques
RELIEF_TECHNIQUES = {
    'breathing': {
        'name': 'Deep Breathing Exercise',
        'description': 'Slow, controlled breathing to reduce pain and anxiety',
        'duration': '5-10 minutes',
        'steps': [
            'Sit or lie down in a comfortable position',
            'Place one hand on your chest, one on your belly',
            'Breathe in slowly through your nose for 4 counts',
            'Hold your breath for 4 counts',
            'Exhale slowly through your mouth for 6 counts',
            'Repeat 5-10 times'
        ]
    },
    'positioning': {
        'name': 'Comfort Positioning',
        'description': 'Optimal positioning to reduce pressure and pain',
        'duration': 'Ongoing',
        'steps': [
            'Find a comfortable chair or lying position',
            'Use pillows to support painful areas',
            'Elevate legs if experiencing lower body pain',
            'Keep your spine neutral and supported',
            'Change positions every 15-20 minutes'
        ]
    },
    'distraction': {
        'name': 'Mental Distraction',
        'description': 'Redirect focus away from pain through mental exercises',
        'duration': '10-15 minutes',
        'steps': [
            'Close your eyes and imagine a peaceful place',
            'Count backwards from 100 by 7s',
            'Name 5 things you can see, 4 you can hear, 3 you can touch',
            'Listen to calming music or sounds',
            'Focus on positive memories or experiences'
        ]
    },
    'movement': {
        'name': 'Gentle Movement',
        'description': 'Light stretching and movement to improve circulation',
        'duration': '5-10 minutes',
        'steps': [
            'Start with gentle neck rolls',
            'Slowly roll your shoulders',
            'Stretch your arms above your head',
            'Gently twist your spine left and right',
            'Do ankle circles if seated'
        ],
        'warning': 'Stop if movement increases pain'
    }
}

# Pain level descriptions
PAIN_DESCRIPTIONS = {
    1: "No pain",
    2: "Mild pain",
    3: "Moderate pain",
    4: "Moderate-severe pain",
    5: "Severe pain",
    6: "Very severe pain",
    7: "Intense pain",
    8: "Extremely intense pain",
    9: "Excruciating pain",
    10: "Unbearable pain"
}

# Emergency symptoms
EMERGENCY_SYMPTOMS = [
    "Chest pain with shortness of breath",
    "Severe headache with vision changes", 
    "Difficulty breathing",
    "Signs of stroke (face drooping, arm weakness, speech difficulty)",
    "Severe abdominal pain",
    "High fever (over 39°C/102°F)",
    "Uncontrolled bleeding",
    "Loss of consciousness"
]

# Sidebar Navigation
with st.sidebar:
    st.markdown("""
    <div style="text-align: center; padding: 1rem;">
        <h2>🏥 PainEase</h2>
        <p style="color: #64748B; font-size: 0.9rem;">Pain Relief Assistant</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Navigation buttons
    if st.button("🏠 Home Dashboard", use_container_width=True, key="btn_home"):
        st.session_state.current_page = 'home'
    if st.button("💊 Pain Relief", use_container_width=True, key="btn_relief"):
        st.session_state.current_page = 'relief'
    if st.button("📊 Analytics", use_container_width=True, key="btn_analytics"):
        st.session_state.current_page = 'analytics'
    if st.button("🚨 Emergency Help", use_container_width=True, key="btn_emergency"):
        st.session_state.current_page = 'emergency'
    
    st.markdown("---")
    
    # Quick stats
    st.markdown("### Quick Stats")
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Sessions Today", "24", "3")
    with col2:
        st.metric("Success Rate", "94%", "2%")

# Helper functions
def assess_pain_emergency(pain_level, symptoms):
    """Check if pain assessment indicates emergency"""
    if pain_level >= 8:
        return True
    
    # Check for emergency symptoms
    for symptom in symptoms:
        for emergency in EMERGENCY_SYMPTOMS:
            if symptom.lower() in emergency.lower():
                return True
    
    return False

def get_relief_recommendations(pain_level, pain_type, location, symptoms):
    """Generate personalized relief recommendations"""
    recommendations = []
    
    # Always include breathing for moderate to severe pain
    if pain_level >= 4:
        recommendations.append('breathing')
    
    # Add positioning for most pain types
    recommendations.append('positioning')
    
    # Add distraction for psychological comfort
    if pain_level >= 3:
        recommendations.append('distraction')
    
    # Add gentle movement for certain conditions (with contraindications)
    if (pain_level <= 6 and 
        location != 'chest' and 
        'shortness of breath' not in symptoms and
        'difficulty breathing' not in symptoms):
        recommendations.append('movement')
    
    return [RELIEF_TECHNIQUES[rec] for rec in recommendations]

def breathing_session():
    """Interactive breathing session"""
    st.markdown("""
    <div class="guided-session">
        <h3>🫁 Guided Breathing Session</h3>
        <p>Follow along with this breathing exercise</p>
    </div>
    """, unsafe_allow_html=True)
    
    if st.button("Start Breathing Session", type="primary"):
        st.session_state.session_active = True
    
    if st.session_state.session_active:
        progress_bar = st.progress(0)
        status_text = st.empty()
        
        cycle_count = 5
        for cycle in range(cycle_count):
            # Inhale
            status_text.markdown("### 🌬️ Breathe In... (4 counts)")
            for i in range(4):
                progress_bar.progress((cycle * 12 + i + 1) / (cycle_count * 12))
                time.sleep(1)
            
            # Hold
            status_text.markdown("### ⏸️ Hold... (4 counts)")
            for i in range(4):
                progress_bar.progress((cycle * 12 + 4 + i + 1) / (cycle_count * 12))
                time.sleep(1)
            
            # Exhale
            status_text.markdown("### 💨 Breathe Out... (6 counts)")
            for i in range(6):
                progress_bar.progress((cycle * 12 + 8 + i + 1) / (cycle_count * 12))
                time.sleep(1)
        
        status_text.markdown("### ✅ Session Complete!")
        st.success("Great job! How do you feel now?")
        
        # Pain rating after session
        new_pain = st.slider("Rate your pain now:", 1, 10, 5)
        if st.button("Save Progress"):
            st.session_state.relief_sessions.append({
                'technique': 'breathing',
                'before_pain': st.session_state.pain_assessment.get('level', 5),
                'after_pain': new_pain,
                'timestamp': datetime.now()
            })
            st.success("Progress saved!")
            st.session_state.session_active = False

# Main content based on selected page
if st.session_state.current_page == 'home':
    # HOME PAGE
    st.markdown("""
    <div class="main-header">
        <h1>🏥 PainEase - Pain Relief Assistant</h1>
        <p>AI-powered healthcare assistant providing immediate pain relief guidance for patients across Africa</p>
    </div>
    """, unsafe_allow_html=True)
    
    # Key metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric(
            label="💚 Patients Helped",
            value="2.3M+",
            delta="147K this month"
        )
    
    with col2:
        st.metric(
            label="🏥 Hospitals",
            value="147",
            delta="12 new"
        )
    
    with col3:
        st.metric(
            label="📈 Success Rate",
            value="94.2%",
            delta="2.1%"
        )
    
    with col4:
        st.metric(
            label="⏱️ Avg Session",
            value="8 min",
            delta="-0.5 min"
        )
    
    # Problem and Solution
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 🔍 The Challenge")
        st.markdown("""
        - **Long Wait Times**: Patients wait 3-8 hours in African public hospitals
        - **Limited Pain Management**: No immediate relief guidance available
        - **No Comfort Measures**: Patients don't know safe pain relief methods
        - **Increased Suffering**: 78% experience worsening pain while waiting
        """)
    
    with col2:
        st.markdown("### 💡 Our Solution")
        st.markdown("""
        - **Instant Pain Assessment**: AI-powered evaluation and recommendations
        - **Guided Relief Techniques**: Step-by-step breathing, positioning, distraction
        - **Emergency Detection**: Automatic escalation for severe cases
        - **Progress Tracking**: Monitor pain levels and effectiveness
        """)
    
    # Quick start
    st.markdown("### 🚀 Get Started")
    if st.button("🎯 Start Pain Assessment", type="primary", use_container_width=True):
        st.session_state.current_page = 'relief'
        st.rerun()
    
    # Recent activity
    st.markdown("### 📊 Today's Activity")
    
    # Generate sample data for chart
    hours = list(range(24))
    pain_sessions = [np.random.randint(0, 15) for _ in hours]
    
    fig = px.bar(x=hours, y=pain_sessions, title="Pain Relief Sessions by Hour")
    fig.update_layout(xaxis_title="Hour of Day", yaxis_title="Number of Sessions")
    st.plotly_chart(fig, use_container_width=True)

elif st.session_state.current_page == 'relief':
    # PAIN RELIEF ASSESSMENT PAGE
    st.title("💊 Pain Relief Assistant")

    # Progress indicator
    if 'assessment_complete' not in st.session_state:
        st.session_state.assessment_complete = False

    if not st.session_state.assessment_complete:
        # Pain Assessment Form
        st.markdown("### 🩺 Pain Assessment")
        st.markdown("Help us understand your pain so we can provide the best relief recommendations.")

        # --- Start of the corrected form ---
        with st.form("pain_assessment_form"): # Renamed for clarity, but "pain_assessment" is fine too
            # Pain level
            pain_level = st.slider(
                "Rate your pain level (1-10):",
                min_value=1,
                max_value=10,
                value=5,
                help="1 = No pain, 10 = Unbearable pain"
            )

            st.markdown(f"**Pain Description**: {PAIN_DESCRIPTIONS[pain_level]}")

            # Pain scale visualization
            st.markdown(f"""
            <div class="pain-scale">
                <div style="width: {pain_level*10}%; height: 100%; background: rgba(0,0,0,0.3); border-radius: 10px;"></div>
            </div>
            """, unsafe_allow_html=True)

            col1, col2 = st.columns(2)

            with col1:
                # Pain type
                pain_type = st.selectbox(
                    "Type of pain:",
                    ["Sharp/Stabbing", "Dull/Aching", "Throbbing", "Burning", "Cramping"]
                )

                # Duration
                duration = st.selectbox(
                    "How long have you had this pain?",
                    ["Less than 1 hour", "1-6 hours", "1 day", "2-7 days", "1+ weeks"]
                )

            with col2:
                # Body location
                location = st.selectbox(
                    "Where is your pain?",
                    ["Head/Neck", "Chest", "Abdomen", "Back", "Legs", "Arms", "Joints"]
                )

            # Additional symptoms
            st.markdown("**Additional symptoms** (select all that apply):")
            symptom_cols = st.columns(4)
            symptoms = []

            symptom_options = [
                "Nausea", "Dizziness", "Shortness of breath", "Fever",
                "Sweating", "Numbness", "Tingling", "Weakness"
            ]

            for i, symptom in enumerate(symptom_options):
                with symptom_cols[i % 4]:
                    if st.checkbox(symptom):
                        symptoms.append(symptom)

            # Use one submit button for this combined form
            submitted = st.form_submit_button("Get Relief Plan", type="primary")

            if submitted:
                # Store all collected data in session_state
                st.session_state.pain_assessment = {
                    'level': pain_level,
                    'type': pain_type,
                    'location': location,
                    'duration': duration,
                    'symptoms': symptoms, # This will be a list of selected symptoms
                    'timestamp': datetime.now()
                }
                st.success("✅ Pain assessment recorded.")

                # Check for emergency
                if assess_pain_emergency(pain_level, symptoms): # Make sure assess_pain_emergency can handle a list of symptoms
                    st.session_state.current_page = 'emergency'
                    st.rerun()
                else:
                    st.session_state.assessment_complete = True
                    st.rerun()
        # --- End of the corrected form ---

    else:
        # Show relief recommendations
        assessment = st.session_state.pain_assessment

        st.markdown("### ✅ Assessment Complete")

        # Display assessment summary
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Pain Level", f"{assessment['level']}/10")
        with col2:
            st.metric("Type", assessment['type'])
        with col3:
            st.metric("Location", assessment['location'])

        # Warning for high pain
        if assessment['level'] >= 7:
            st.markdown("""
            <div class="emergency-alert">
                ⚠️ <strong>High Pain Level Detected</strong><br>
                Your pain level indicates you may need immediate medical attention.
                Please inform medical staff if your pain worsens.
            </div>
            """, unsafe_allow_html=True)
        
        # Get recommendations
        recommendations = get_relief_recommendations(
            assessment['level'],
            assessment['type'],
            assessment['location'],
            assessment['symptoms']
        )
        
        st.markdown("### 💚 Your Personalized Relief Plan")
        
        # Create tabs for different techniques
        if recommendations:
            tab_names = [rec['name'] for rec in recommendations]
            tabs = st.tabs(tab_names)
            
            for i, (tab, rec) in enumerate(zip(tabs, recommendations)):
                with tab:
                    st.markdown(f"""
                    <div class="relief-card">
                        <h4>{rec['name']}</h4>
                        <p><em>{rec['description']}</em></p>
                        <p><strong>Duration:</strong> {rec['duration']}</p>
                    </div>
                    """, unsafe_allow_html=True)
                    
                    if 'warning' in rec:
                        st.warning(f"⚠️ {rec['warning']}")
                    
                    st.markdown("**Steps:**")
                    for j, step in enumerate(rec['steps'], 1):
                        st.markdown(f"{j}. {step}")
                    
                    # Special handling for breathing exercise
                    if rec['name'] == 'Deep Breathing Exercise':
                        if st.button(f"🫁 Start Guided Session", key=f"breathing_{i}"):
                            breathing_session()
                    
                    # Rate effectiveness
                    if st.button(f"✅ Mark as Helpful", key=f"helpful_{i}"):
                        st.success("Thank you for your feedback!")
        
        # Progress tracking
        st.markdown("### 📊 Track Your Progress")
        
        col1, col2 = st.columns(2)
        with col1:
            current_pain = st.slider(
                "How is your pain now?",
                min_value=1,
                max_value=10,
                value=assessment['level'],
                key="current_pain"
            )
        
        with col2:
            if st.button("💾 Update Pain Level"):
                # Record progress
                progress_entry = {
                    'original_pain': assessment['level'],
                    'current_pain': current_pain,
                    'improvement': assessment['level'] - current_pain,
                    'timestamp': datetime.now()
                }
                
                if 'progress_history' not in st.session_state:
                    st.session_state.progress_history = []
                st.session_state.progress_history.append(progress_entry)
                
                if current_pain < assessment['level']:
                    st.success(f"Great! Your pain improved by {assessment['level'] - current_pain} points!")
                elif current_pain == assessment['level']:
                    st.info("Pain level unchanged. Try another technique or inform medical staff.")
                else:
                    st.warning("Pain has increased. Please inform medical staff immediately.")
        
        # Action buttons
        col1, col2, col3 = st.columns(3)
        with col1:
            if st.button("🔄 New Assessment"):
                st.session_state.assessment_complete = False
                st.session_state.pain_assessment = {}
                st.rerun()
        
        with col2:
            if st.button("🆘 Need Help"):
                st.session_state.current_page = 'emergency'
                st.rerun()
        
        with col3:
            if st.button("📱 Call Nurse"):
                st.info("📞 Nurse has been notified. Someone will assist you shortly.")

elif st.session_state.current_page == 'analytics':
    # ANALYTICS PAGE
    st.title("📊 Pain Relief Analytics")
    
    # Overall metrics
    col1, col2, col3, col4 = st.columns(4)
    
    with col1:
        st.metric("Total Sessions", "147", "12")
    with col2:
        st.metric("Avg Pain Reduction", "2.3 points", "0.3")
    with col3:
        st.metric("Success Rate", "94.2%", "1.2%")
    with col4:
        st.metric("Avg Session Time", "8.5 min", "-0.5")
    
    # Progress history
    if 'progress_history' in st.session_state and st.session_state.progress_history:
        st.markdown("### 📈 Your Progress History")
        
        progress_df = pd.DataFrame(st.session_state.progress_history)
        
        # Pain improvement chart
        fig = px.line(
            progress_df,
            x='timestamp',
            y=['original_pain', 'current_pain'],
            title="Pain Level Over Time",
            labels={'value': 'Pain Level', 'timestamp': 'Time'}
        )
        st.plotly_chart(fig, use_container_width=True)
        
        # Improvement metrics
        avg_improvement = progress_df['improvement'].mean()
        if avg_improvement > 0:
            st.success(f"Average pain reduction: {avg_improvement:.1f} points")
        else:
            st.info("Continue using the relief techniques for better results")
    
    else:
        st.info("Complete a pain assessment to see your progress analytics.")
    
    # Relief session history
    if st.session_state.relief_sessions:
        st.markdown("### 🎯 Relief Session History")
        sessions_df = pd.DataFrame(st.session_state.relief_sessions)
        
        # Technique effectiveness
        technique_effectiveness = sessions_df.groupby('technique')['improvement'].mean()
        
        fig = px.bar(
            x=technique_effectiveness.index,
            y=technique_effectiveness.values,
            title="Technique Effectiveness (Average Pain Reduction)"
        )
        st.plotly_chart(fig, use_container_width=True)

elif st.session_state.current_page == 'emergency':
    # EMERGENCY PAGE
    st.title("🚨 Emergency Assistance")
    
    st.markdown("""
    <div class="emergency-alert">
        🚨 <strong>IMMEDIATE MEDICAL ATTENTION REQUIRED</strong><br>
        Based on your symptoms, you need immediate medical evaluation.
    </div>
    """, unsafe_allow_html=True)
    
    # Emergency actions
    col1, col2 = st.columns(2)
    
    with col1:
        if st.button("📞 Call Emergency Services", type="primary", use_container_width=True):
            st.markdown("""
            <div class="success-message">
                📞 <strong>Emergency Services Contacted</strong><br>
                Emergency services have been notified. Help is on the way.
            </div>
            """, unsafe_allow_html=True)
    
    with col2:
        if st.button("👨‍⚕️ Notify Medical Staff", use_container_width=True):
            st.markdown("""
            <div class="success-message">
                👨‍⚕️ <strong>Medical Staff Notified</strong><br>
                Medical staff have been alerted to your condition.
            </div>
            """, unsafe_allow_html=True)
    
    # Emergency symptoms checklist
    st.markdown("### ⚠️ Emergency Symptoms")
    st.markdown("If you are experiencing any of these symptoms, seek immediate medical help:")
    
    for symptom in EMERGENCY_SYMPTOMS:
        st.markdown(f"- {symptom}")
    
    # Emergency contacts
    st.markdown("### 📞 Emergency Contacts")
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("""
        **Emergency Services:**
        - South Africa: 10177
        - Kenya: 999
        - Nigeria: 199
        """)
    
    with col2:
        st.markdown("""
        **Poison Control:**
        - South Africa: 0861 555 777
        - Universal: Contact local emergency
        """)
    
    # Return option
    if st.button("← Return to Pain Assessment"):
        st.session_state.current_page = 'relief'
        st.rerun()

# Footer
st.markdown("---")
st.markdown("""
<div style="text-align: center; color: #64748B; padding: 1rem;">
    <p>🏥 PainEase Pain Relief Assistant | Privacy Compliant | 
    Supporting UN SDG Goals 3, 10 & 16</p>
    <p><small>© 2024 PainEase. All rights reserved.</small></p>
</div>
""", unsafe_allow_html=True)
