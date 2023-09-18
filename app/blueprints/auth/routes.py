from . import auth
from app.models import db, User
from flask import request, jsonify
from flask_jwt_extended import create_access_token

@auth.route('/register', methods=['POST'])
def register():
    data = request.json

    username = data.get('username')
    password = data.get('password')

    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({"message": "Username already taken"}), 400
    
    new_user = User(username=username)
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"success": True, "message": "User registered successfully"})


@auth.route('/login', methods=['GET', 'POST'])
def login():
    data = request.json

    username = data['username']
    password = data['password']

    user = User.query.filter_by(username=data['username']).first()
    if not user or not user.check_password(data[password]):
        return jsonify({"message": "Invalid username or password"}), 401
    
    access_token = create_access_token(identity=username)
    
    response_data = {"success": True, "message": "Logged in successfully", "access_token": access_token}
    return jsonify(response_data)
