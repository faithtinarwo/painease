# HealthVerify - Patient Eligibility System

🏥 **AI-powered patient eligibility verification system for public healthcare institutions worldwide**

Supporting UN SDG Goals 3, 10 & 16 through equitable healthcare access and resource management.

## 🌟 Features

### 🔍 **Patient Verification**

- **Document Scanner**: Upload or capture ID documents, passports, asylum permits
- **AI Classification**: Intelligent patient categorization (Citizen, Legal Immigrant, Undocumented)
- **Eligibility Assessment**: Determines healthcare payment requirements
- **Fraud Detection**: Real-time suspicious activity alerts
- **POPIA Compliant**: Secure data handling meeting South African privacy regulations

### 📊 **Admin Dashboard**

- **Real-time Analytics**: System performance and verification metrics
- **Verification History**: Comprehensive patient processing records
- **Alert Management**: Red flag notifications and system alerts
- **Report Generation**: Compliance and analytics reporting
- **Data Export**: CSV/Excel export for external analysis

### 🚨 **Compliance & Security**

- **POPIA Compliance**: 7-year data retention with automatic cleanup
- **Audit Logging**: Complete action trail for accountability
- **Data Anonymization**: Patient ID hashing for privacy protection
- **Secure Storage**: Encrypted database with access controls

## 🚀 Quick Start

### Prerequisites

- Python 3.8 or higher
- pip or conda package manager

### Installation

1. **Clone or download the application files**
2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Streamlit app:**

   ```bash
   streamlit run app.py
   ```

4. **Open your browser to:**
   ```
   http://localhost:8501
   ```

## 🏗️ Project Structure

```
batho-pele-app/
├── app.py                 # Main Streamlit application
├── ai_verification.py     # AI document verification engine
├── data_utils.py         # Data management and POPIA compliance
├── requirements.txt      # Python dependencies
├── .streamlit/
│   └── config.toml       # Streamlit configuration
└── README.md            # This file
```

## 📱 Application Pages

### 🏠 **Home Dashboard**

- System overview and key metrics
- Verification trends and analytics
- UN SDG alignment information
- Quick navigation to all features

### 🔍 **Patient Verification**

- Document upload interface
- Real-time processing with progress indicators
- Verification results with confidence scoring
- Eligibility determination and recommendations

### 📊 **Admin Dashboard**

- Comprehensive system analytics
- Recent verification history
- Performance monitoring
- Quick action buttons

### 🚨 **Alerts & Reports**

- Active system alerts
- Fraud detection notifications
- Compliance reporting
- Data export functionality

## 🤖 AI Verification Workflow

1. **Document Upload**: Patient document (ID, passport, permit) uploaded or captured
2. **Image Processing**: AI preprocesses image for optimal OCR and analysis
3. **Text Extraction**: OCR extracts key information from document
4. **Validation**: Document authenticity and format validation
5. **Classification**: Patient categorized based on document type and status
6. **Eligibility**: Healthcare payment requirements determined
7. **Fraud Check**: Security features and red flags analyzed
8. **Results**: Comprehensive verification report generated

## 📋 Patient Categories & Eligibility

### 🇿🇦 **South African Citizens**

- **Free Services**: Emergency care, primary healthcare, maternal care, immunizations
- **Payment**: No fees for essential services
- **Documentation**: Valid SA ID required

### 📄 **Legal Immigrants**

- **Free Services**: Emergency care, communicable disease treatment
- **Reduced Fees**: Primary healthcare, chronic medication (50% discount)
- **Full Fees**: Specialist consultations, elective procedures
- **Documentation**: Valid passport, work permit, or refugee ID

### ❓ **Undocumented Persons**

- **Free Services**: Emergency care, communicable disease treatment only
- **Full Fees**: All other services require full payment
- **Manual Review**: Cases flagged for administrative evaluation

## 🔒 POPIA Compliance Features

### Data Protection

- **Encryption**: All sensitive data encrypted at rest and in transit
- **Anonymization**: Patient identifiers hashed for privacy
- **Access Control**: Role-based system access restrictions
- **Audit Trail**: Complete logging of all data access and modifications

### Data Retention

- **7-Year Retention**: Automatic expiry dating for all records
- **Automated Cleanup**: Scheduled removal of expired data
- **Right to Erasure**: Manual data deletion capabilities
- **Data Minimization**: Only essential information stored

### Compliance Monitoring

- **Regular Audits**: Automated compliance scoring and reporting
- **Violation Alerts**: Real-time notifications of potential breaches
- **Training Records**: User access and training documentation
- **Incident Response**: Structured breach response procedures

## 📊 Analytics & Reporting

### Dashboard Metrics

- Daily/weekly/monthly verification counts
- Patient category distribution
- Document validity rates
- System performance indicators
- Fraud detection statistics

### Compliance Reports

- POPIA compliance scoring
- Data retention status
- Audit trail completeness
- Security incident summaries

### Operational Reports

- Hospital utilization patterns
- Resource allocation insights
- Cost impact analysis
- Service delivery metrics

## 🛠️ Technical Specifications

### AI Engine

- **Document Processing**: OpenCV image preprocessing
- **OCR Capability**: Text extraction from identity documents
- **Validation Logic**: Rule-based document authenticity checking
- **Classification Algorithm**: Multi-factor patient categorization
- **Fraud Detection**: Pattern recognition for suspicious documents

### Data Storage

- **Database**: SQLite for local deployment, PostgreSQL for production
- **Backup**: Automated daily backups with encryption
- **Scalability**: Horizontal scaling support for high-volume hospitals
- **Integration**: API endpoints for EMR system integration

### Security

- **Authentication**: Multi-factor authentication support
- **Authorization**: Role-based access control (RBAC)
- **Network Security**: HTTPS encryption and secure headers
- **Data Validation**: Input sanitization and SQL injection prevention

## 🌍 UN SDG Alignment

### SDG 3: Good Health & Well-being

- **Universal Access**: Ensuring healthcare availability for all populations
- **Quality Care**: Maintaining service standards through proper resource allocation
- **Health Equity**: Reducing disparities in healthcare access

### SDG 10: Reduced Inequalities

- **Fair Treatment**: Transparent eligibility criteria applied consistently
- **Non-discrimination**: Equal processing regardless of nationality or status
- **Social Protection**: Safety net for vulnerable populations

### SDG 16: Strong Institutions

- **Transparent Systems**: Clear processes and accountability measures
- **Rule of Law**: Consistent application of healthcare policies
- **Effective Governance**: Data-driven decision making for resource allocation

## 🚀 Deployment Options

### Local Deployment

```bash
# Single hospital deployment
streamlit run app.py --server.port 8501
```

### Cloud Deployment

#### Heroku

```bash
# Heroku deployment
heroku create batho-pele-app
git push heroku main
```

#### Google Cloud Platform

```bash
# GCP App Engine deployment
gcloud app deploy
```

#### Docker Deployment

```dockerfile
FROM python:3.9-slim
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8501
CMD ["streamlit", "run", "app.py"]
```

## 🔧 Configuration

### Environment Variables

```bash
# Database configuration
DATABASE_URL=sqlite:///healthcare_data.db

# Security settings
SECRET_KEY=your-secret-key-here
ENCRYPTION_KEY=your-encryption-key

# API endpoints (if using external services)
DOCUMENT_VERIFICATION_API=https://api.example.com
```

### Streamlit Configuration

```toml
# .streamlit/config.toml
[theme]
primaryColor = "#1ABC9C"
backgroundColor = "#FFFFFF"
secondaryBackgroundColor = "#F0F2F6"

[server]
headless = true
port = 8501
enableCORS = false
```

## 📞 Support & Documentation

### Getting Help

- **Technical Issues**: Check the troubleshooting section below
- **Feature Requests**: Submit via GitHub issues
- **Security Concerns**: Contact security team directly

### Training Resources

- **User Manual**: Comprehensive usage documentation
- **Video Tutorials**: Step-by-step verification process
- **Best Practices**: Guidelines for optimal system usage
- **Compliance Training**: POPIA and data protection education

## 🔧 Troubleshooting

### Common Issues

**Document Upload Fails**

- Check file size (max 10MB)
- Ensure supported format (PNG, JPG, PDF)
- Verify internet connection

**Low Verification Confidence**

- Ensure good lighting when capturing documents
- Check document is not damaged or blurred
- Retake photo with better angle/focus

**System Performance Issues**

- Clear browser cache
- Restart Streamlit application
- Check system resource usage

### Error Codes

- `VER_001`: Document format not supported
- `VER_002`: OCR extraction failed
- `VER_003`: Database connection error
- `VER_004`: Authentication failure

## 📈 Future Enhancements

### Planned Features

- **Mobile App**: Native iOS/Android applications
- **Integration APIs**: EMR system connectivity
- **Advanced Analytics**: Machine learning insights
- **Multi-language Support**: Zulu, Xhosa, Afrikaans interfaces
- **Biometric Verification**: Fingerprint and facial recognition

### Roadmap

- **Q2 2024**: Mobile application development
- **Q3 2024**: Provincial health department integration
- **Q4 2024**: National rollout and scaling
- **Q1 2025**: Advanced AI features and predictive analytics

## 📄 License

This healthcare eligibility system is developed to support public healthcare in South Africa.

For licensing inquiries and deployment partnerships, please contact the development team.

---

**© 2024 HealthVerify Healthcare System**  
_Empowering equitable healthcare access through AI-powered verification_

🏥 Supporting South African public hospitals  
🌍 Aligned with UN Sustainable Development Goals  
🔒 POPIA compliant and secure
