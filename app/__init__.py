from flask import Flask
from flask_login import LoginManager
from config import Config
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db, User

def create_app():

    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SECRET_KEY']

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

    jwt = JWTManager(app)

    login_manager = LoginManager()

    db.init_app(app)

    migrate = Migrate(app, db)

    login_manager.login_view = 'auth.login'
    login_manager.login_message_category = 'error'
    login_manager.login_message = None

    from app.blueprints.auth import auth
    from app.blueprints.main import main

    app.register_blueprint(auth, url_prefix='/api')
    app.register_blueprint(main, url_prefix='/api')

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(user_id)


    return app
