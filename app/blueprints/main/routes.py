from . import main
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request
from app.models import db, Task, User

from flask_jwt_extended import get_jwt_identity

def get_current_user_id():
    username = get_jwt_identity()  # Get username from JWT token
    user = User.query.filter_by(username=username).first()
    return user.id if user else None


@main.route('/save_task', methods=['POST'])
@jwt_required()
def create_task():
    user_id = get_current_user_id()
    if not user_id:
        return jsonify({"error": "User not found!"}), 404

    data = request.get_json()
    new_task = Task(title=data['title'], user_id=user_id)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"message": "Task created!", "task": new_task.to_dict()}), 201


@main.route('/tasks', methods=['GET'])
@jwt_required()
def get_tasks():
    user_id = get_current_user_id()
    tasks = Task.query.filter_by(user_id=user_id).all()
    return jsonify([task.to_dict() for task in tasks])



@main.route('/tasks/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found!"}), 404

    data = request.get_json()
    task.completed = data.get('completed', task.completed)
    db.session.commit()
    return jsonify({"message": "Task updated!"})


@main.route('/tasks/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        return jsonify({"error": "Task not found!"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted!"})