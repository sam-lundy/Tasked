from flask import Flask
from config import Config
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db, User
from flask_login import LoginManager

# def create_app():

app = Flask(__name__)
app.config.from_object(Config)
app.config['SECRET_KEY']

CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

login_manager = LoginManager()
login_manager.init_app(app)

jwt = JWTManager(app)

db.init_app(app)

migrate = Migrate(app, db)

from app.blueprints.auth import auth
from app.blueprints.main import main

app.register_blueprint(auth, url_prefix='/api')
app.register_blueprint(main, url_prefix='/api')

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))



    # return app
