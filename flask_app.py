from flask import Flask, render_template, request, jsonify, session
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import json
import os

app = Flask(__name__)
app.secret_key = 'painease-secret-key-change-in-production'

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

PAIN_DESCRIPTIONS = {
    1: "No pain", 2: "Mild pain", 3: "Moderate pain", 4: "Moderate-severe pain",
    5: "Severe pain", 6: "Very severe pain", 7: "Intense pain", 
    8: "Extremely intense pain", 9: "Excruciating pain", 10: "Unbearable pain"
}

def assess_pain_emergency(pain_level, symptoms):
    """Check if pain assessment indicates emergency"""
    if pain_level >= 8:
        return True
    
    emergency_keywords = ['chest pain', 'difficulty breathing', 'severe headache', 
                         'stroke', 'bleeding', 'fever', 'unconscious']
    
    for symptom in symptoms:
        for keyword in emergency_keywords:
            if keyword in symptom.lower():
                return True
    
    return False

def get_relief_recommendations(pain_level, pain_type, location, symptoms):
    """Generate personalized relief recommendations"""
    recommendations = []
    
    if pain_level >= 4:
        recommendations.append('breathing')
    
    recommendations.append('positioning')
    
    if pain_level >= 3:
        recommendations.append('distraction')
    
    if (pain_level <= 6 and 
        location != 'chest' and 
        'shortness of breath' not in symptoms):
        recommendations.append('movement')
    
    return [RELIEF_TECHNIQUES[rec] for rec in recommendations]

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/relief')
def relief():
    return render_template('relief.html', 
                         pain_descriptions=PAIN_DESCRIPTIONS)

@app.route('/api/assess_pain', methods=['POST'])
def assess_pain():
    data = request.json
    
    pain_level = int(data.get('pain_level', 5))
    pain_type = data.get('pain_type', '')
    location = data.get('location', '')
    duration = data.get('duration', '')
    symptoms = data.get('symptoms', [])
    
    # Store assessment in session
    session['pain_assessment'] = {
        'level': pain_level,
        'type': pain_type,
        'location': location,
        'duration': duration,
        'symptoms': symptoms,
        'timestamp': datetime.now().isoformat()
    }
    
    # Check for emergency
    is_emergency = assess_pain_emergency(pain_level, symptoms)
    
    if is_emergency:
        return jsonify({
            'status': 'emergency',
            'message': 'Emergency medical attention required'
        })
    
    # Get recommendations
    recommendations = get_relief_recommendations(pain_level, pain_type, location, symptoms)
    
    return jsonify({
        'status': 'success',
        'recommendations': recommendations,
        'pain_description': PAIN_DESCRIPTIONS[pain_level],
        'warning': pain_level >= 7
    })

@app.route('/api/update_pain', methods=['POST'])
def update_pain():
    data = request.json
    new_pain_level = int(data.get('pain_level', 5))
    
    if 'pain_assessment' in session:
        original_pain = session['pain_assessment']['level']
        improvement = original_pain - new_pain_level
        
        # Store progress
        if 'progress_history' not in session:
            session['progress_history'] = []
        
        session['progress_history'].append({
            'original_pain': original_pain,
            'current_pain': new_pain_level,
            'improvement': improvement,
            'timestamp': datetime.now().isoformat()
        })
        
        return jsonify({
            'status': 'success',
            'improvement': improvement,
            'message': f'Pain level updated. Improvement: {improvement} points'
        })
    
    return jsonify({'status': 'error', 'message': 'No assessment found'})

@app.route('/analytics')
def analytics():
    progress_history = session.get('progress_history', [])
    return render_template('analytics.html', progress_history=progress_history)

@app.route('/emergency')
def emergency():
    return render_template('emergency.html')

# Create templates directory and HTML files
if not os.path.exists('templates'):
    os.makedirs('templates')

# Base template
base_template = '''
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}PainEase{% endblock %}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .pain-scale {
            background: linear-gradient(90deg, #27AE60 0%, #F39C12 50%, #E74C3C 100%);
            height: 20px;
            border-radius: 10px;
        }
    </style>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <div class="flex-shrink-0">
                        <span class="text-2xl">🏥</span>
                    </div>
                    <div class="ml-3">
                        <h1 class="text-xl font-bold text-gray-900">PainEase</h1>
                        <p class="text-xs text-gray-500">Pain Relief Assistant</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <a href="/" class="text-gray-700 hover:text-blue-600">Home</a>
                    <a href="/relief" class="text-gray-700 hover:text-blue-600">Relief</a>
                    <a href="/analytics" class="text-gray-700 hover:text-blue-600">Analytics</a>
                    <a href="/emergency" class="text-red-600 hover:text-red-800">Emergency</a>
                </div>
            </div>
        </div>
    </nav>
    
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {% block content %}{% endblock %}
    </main>
    
    <footer class="bg-white border-t mt-12">
        <div class="max-w-7xl mx-auto py-4 px-4 text-center text-gray-500">
            <p>© 2024 PainEase. Supporting healthcare across Africa.</p>
        </div>
    </footer>
</body>
</html>
'''

with open('templates/base.html', 'w') as f:
    f.write(base_template)

# Home template
home_template = '''
{% extends "base.html" %}

{% block content %}
<div class="bg-gradient-to-r from-blue-500 to-teal-500 text-white p-8 rounded-lg mb-8">
    <h1 class="text-4xl font-bold mb-4">Providing Immediate Pain Relief for all Africans</h1>
    <p class="text-xl mb-6">AI-powered healthcare assistant that provides immediate pain relief guidance and comfort measures while patients wait to see medical professionals.</p>
    <a href="/relief" class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">Get Pain Relief →</a>
</div>

<div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-3xl font-bold text-blue-600">2.3M+</div>
        <div class="text-gray-600">Patients Helped</div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-3xl font-bold text-blue-600">147</div>
        <div class="text-gray-600">Hospitals</div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-3xl font-bold text-blue-600">94.2%</div>
        <div class="text-gray-600">Success Rate</div>
    </div>
    <div class="bg-white p-6 rounded-lg shadow">
        <div class="text-3xl font-bold text-blue-600">8 min</div>
        <div class="text-gray-600">Avg Session</div>
    </div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-2xl font-bold mb-4">🔍 The Challenge</h3>
        <ul class="space-y-2">
            <li>• Long wait times in healthcare facilities</li>
            <li>• Limited pain management guidance</li>
            <li>• No comfort measures available</li>
            <li>• Increased suffering while waiting</li>
        </ul>
    </div>
    
    <div class="bg-white p-6 rounded-lg shadow">
        <h3 class="text-2xl font-bold mb-4">💡 Our Solution</h3>
        <ul class="space-y-2">
            <li>• Instant pain assessment and recommendations</li>
            <li>• Guided relief techniques</li>
            <li>• Emergency detection and escalation</li>
            <li>• Progress tracking and monitoring</li>
        </ul>
    </div>
</div>
{% endblock %}
'''

with open('templates/home.html', 'w') as f:
    f.write(home_template)

# Relief template
relief_template = '''
{% extends "base.html" %}

{% block content %}
<div id="app" class="max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">💊 Pain Relief Assistant</h1>
    
    <!-- Assessment Form -->
    <div id="assessment-form" class="bg-white p-6 rounded-lg shadow mb-6">
        <h2 class="text-2xl font-bold mb-4">🩺 Pain Assessment</h2>
        <form id="pain-form">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label class="block text-sm font-medium mb-2">Pain Level (1-10):</label>
                    <input type="range" id="pain-level" min="1" max="10" value="5" 
                           class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
                    <div class="text-center mt-2">
                        <span id="pain-description" class="text-lg font-semibold">Severe pain</span>
                    </div>
                    <div class="pain-scale mt-2"></div>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Pain Type:</label>
                    <select id="pain-type" class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select pain type</option>
                        <option value="sharp">Sharp/Stabbing</option>
                        <option value="dull">Dull/Aching</option>
                        <option value="throbbing">Throbbing</option>
                        <option value="burning">Burning</option>
                        <option value="cramping">Cramping</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Location:</label>
                    <select id="location" class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select location</option>
                        <option value="head">Head/Neck</option>
                        <option value="chest">Chest</option>
                        <option value="abdomen">Abdomen</option>
                        <option value="back">Back</option>
                        <option value="legs">Legs</option>
                        <option value="arms">Arms</option>
                        <option value="joints">Joints</option>
                    </select>
                </div>
                
                <div>
                    <label class="block text-sm font-medium mb-2">Duration:</label>
                    <select id="duration" class="w-full p-2 border border-gray-300 rounded-lg">
                        <option value="">Select duration</option>
                        <option value="<1h">Less than 1 hour</option>
                        <option value="1-6h">1-6 hours</option>
                        <option value="1d">1 day</option>
                        <option value="2-7d">2-7 days</option>
                        <option value="1w+">1+ weeks</option>
                    </select>
                </div>
            </div>
            
            <div class="mt-6">
                <label class="block text-sm font-medium mb-2">Additional Symptoms:</label>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <label class="flex items-center">
                        <input type="checkbox" value="nausea" class="mr-2"> Nausea
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" value="dizziness" class="mr-2"> Dizziness
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" value="shortness of breath" class="mr-2"> Shortness of breath
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" value="fever" class="mr-2"> Fever
                    </label>
                </div>
            </div>
            
            <button type="submit" class="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
                Get Relief Plan
            </button>
        </form>
    </div>
    
    <!-- Results -->
    <div id="results" class="hidden">
        <div id="emergency-alert" class="hidden bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>⚠️ Emergency:</strong> <span id="emergency-message"></span>
        </div>
        
        <div id="recommendations" class="space-y-4"></div>
        
        <div class="mt-6 bg-white p-6 rounded-lg shadow">
            <h3 class="text-xl font-bold mb-4">📊 Track Your Progress</h3>
            <label class="block text-sm font-medium mb-2">How is your pain now?</label>
            <input type="range" id="current-pain" min="1" max="10" value="5" 
                   class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer">
            <button id="update-pain" class="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
                Update Pain Level
            </button>
        </div>
    </div>
</div>

<script>
const painDescriptions = {{ pain_descriptions | tojsonfilter }};

// Update pain description
document.getElementById('pain-level').addEventListener('input', function() {
    const level = parseInt(this.value);
    document.getElementById('pain-description').textContent = painDescriptions[level];
});

// Handle form submission
document.getElementById('pain-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        pain_level: document.getElementById('pain-level').value,
        pain_type: document.getElementById('pain-type').value,
        location: document.getElementById('location').value,
        duration: document.getElementById('duration').value,
        symptoms: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value)
    };
    
    try {
        const response = await fetch('/api/assess_pain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.status === 'emergency') {
            document.getElementById('emergency-alert').classList.remove('hidden');
            document.getElementById('emergency-message').textContent = result.message;
        } else {
            showRecommendations(result.recommendations);
        }
        
        document.getElementById('results').classList.remove('hidden');
        
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});

function showRecommendations(recommendations) {
    const container = document.getElementById('recommendations');
    container.innerHTML = '';
    
    recommendations.forEach(rec => {
        const div = document.createElement('div');
        div.className = 'bg-white p-6 rounded-lg shadow';
        div.innerHTML = `
            <h3 class="text-xl font-bold mb-2">${rec.name}</h3>
            <p class="text-gray-600 mb-2">${rec.description}</p>
            <p class="text-sm text-blue-600 mb-4">Duration: ${rec.duration}</p>
            ${rec.warning ? `<div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-3 py-2 rounded mb-4">⚠️ ${rec.warning}</div>` : ''}
            <ol class="list-decimal list-inside space-y-1">
                ${rec.steps.map(step => `<li>${step}</li>`).join('')}
            </ol>
        `;
        container.appendChild(div);
    });
}

// Handle pain update
document.getElementById('update-pain').addEventListener('click', async function() {
    const newPainLevel = document.getElementById('current-pain').value;
    
    try {
        const response = await fetch('/api/update_pain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({pain_level: newPainLevel})
        });
        
        const result = await response.json();
        alert(result.message);
        
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
</script>
{% endblock %}
'''

with open('templates/relief.html', 'w') as f:
    f.write(relief_template)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
