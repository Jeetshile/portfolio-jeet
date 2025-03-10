from flask import Flask
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='../static', template_folder='../')

# Configure CORS based on environment
if os.environ.get('FLASK_ENV') == 'production':
    # In production, only allow requests from your domain
    CORS(app, resources={r"/api/*": {"origins": ["https://your-domain.com"]}})
else:
    # In development, allow all origins
    CORS(app)

# Import routes
from app.routes import main_routes, api_routes

# Register blueprints
app.register_blueprint(main_routes.main)
app.register_blueprint(api_routes.api, url_prefix='/api') 