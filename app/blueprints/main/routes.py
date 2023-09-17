from . import main
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify

@main.route('/mytasks', methods=['GET'])
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user)