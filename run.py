from app import app
import os

if __name__ == '__main__':
    # Use 0.0.0.0 to make the server publicly available
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000))) 