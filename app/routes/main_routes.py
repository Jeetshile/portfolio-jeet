from flask import Blueprint, render_template, send_from_directory
import os

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/static/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@main.route('/images/<path:path>')
def serve_images(path):
    return send_from_directory('static/images', path)

@main.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory('static/js', path)

@main.route('/css/<path:path>')
def serve_css(path):
    return send_from_directory('static/css', path) 