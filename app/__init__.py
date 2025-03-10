from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../static', template_folder='../')

# Configure CORS based on environment
if os.environ.get('FLASK_ENV') == 'production':
    # In production, only allow requests from your domain
    CORS(app, resources={r"/api/*": {"origins": ["https://portfolio-jeet.onrender.com"]}})
else:
    # In development, allow all origins
    CORS(app)
    # Enable debug mode in development
    app.config['DEBUG'] = True

# Import routes
from app.routes import main_routes, api_routes

# Register blueprints
app.register_blueprint(main_routes.main)
app.register_blueprint(api_routes.api, url_prefix='/api') 