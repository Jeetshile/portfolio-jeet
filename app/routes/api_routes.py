from flask import Blueprint, request, jsonify
from app import app
from decouple import config
import json
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os

# Configure logging based on environment
if os.environ.get('FLASK_ENV') == 'production':
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s [%(levelname)s] %(message)s',
        handlers=[
            logging.StreamHandler(),
            logging.FileHandler('app.log')
        ]
    )
else:
    logging.basicConfig(level=logging.INFO)

logger = logging.getLogger(__name__)

api = Blueprint('api', __name__)

def send_email(name, email, message):
    """Helper function to send email using smtplib"""
    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = config('EMAIL')
        msg['To'] = config('EMAIL')
        msg['Subject'] = f"Portfolio Contact from {name}"
        
        # Create email body
        body = f"""
From: {name}
Email: {email}

Message:
{message}
        """
        msg.attach(MIMEText(body, 'plain'))
        
        # Create SMTP connection
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
            logger.info("Connecting to SMTP server...")
            server.login(config('EMAIL'), config('EMAIL_PASSWORD'))
            logger.info("Successfully logged in")
            
            # Send email
            server.send_message(msg)
            logger.info("Email sent successfully")
            return True
            
    except Exception as e:
        logger.error(f"Error sending email: {str(e)}")
        raise e

@api.route('/contact', methods=['POST'])
def contact():
    try:
        data = request.get_json()
        logger.info(f"Received contact form submission from {data.get('name', 'unknown')}")
        
        if not all(key in data for key in ['name', 'email', 'message']):
            logger.error("Missing required fields in contact form submission")
            return jsonify({'error': 'Missing required fields'}), 400
        
        try:
            send_email(data['name'], data['email'], data['message'])
            return jsonify({
                'message': 'Email sent successfully',
                'status': 'success'
            }), 200
            
        except Exception as e:
            logger.error(f"Failed to send email: {str(e)}")
            return jsonify({
                'error': str(e),
                'status': 'error',
                'message': 'Failed to send email'
            }), 500
            
    except Exception as e:
        error_msg = str(e)
        logger.error(f"Error in contact form: {error_msg}")
        return jsonify({
            'error': error_msg,
            'status': 'error',
            'message': 'Failed to process contact form'
        }), 500

@api.route('/projects', methods=['GET'])
def get_projects():
    try:
        projects = [
            {
                "title": "Interactive Portfolio",
                "description": "Personal portfolio website with Three.js animations and interactive elements",
                "technologies": ["HTML", "CSS", "JavaScript", "Three.js", "Flask"],
                "image": "images/portfolio.jpg",
                "github": "https://github.com/Jeetshile/portfolio",
                "live": "https://jeetshile.com"
            },
            {
                "title": "Python Web Development Projects",
                "description": "Collection of web applications built using Python and modern frameworks",
                "technologies": ["Python", "Flask", "Django", "RESTful APIs"],
                "image": "images/python-projects.jpg",
                "github": "https://github.com/Jeetshile/python-projects",
                "category": "Web Development"
            },
            {
                "title": "Data Analysis Portfolio",
                "description": "Showcase of data analysis and visualization projects",
                "technologies": ["Python", "Pandas", "NumPy", "Matplotlib", "Jupyter"],
                "image": "images/data-analysis.jpg",
                "github": "https://github.com/Jeetshile/data-analysis",
                "category": "Data Science"
            }
        ]
        return jsonify(projects), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/skills', methods=['GET'])
def get_skills():
    try:
        skills = {
            "programming": [
                {"name": "Python", "level": 90},
                {"name": "JavaScript", "level": 85},
                {"name": "HTML5/CSS3", "level": 88},
                {"name": "SQL", "level": 85}
            ],
            "frameworks": [
                {"name": "Flask", "level": 88},
                {"name": "Django", "level": 85},
                {"name": "React", "level": 80},
                {"name": "Vue.js", "level": 75}
            ],
            "databases": [
                {"name": "MongoDB", "level": 85},
                {"name": "PostgreSQL", "level": 80},
                {"name": "MySQL", "level": 82}
            ],
            "tools": [
                {"name": "Git", "level": 88},
                {"name": "Docker", "level": 75},
                {"name": "AWS", "level": 70},
                {"name": "Linux", "level": 85}
            ]
        }
        return jsonify(skills), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500 