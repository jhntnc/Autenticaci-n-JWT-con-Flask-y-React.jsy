"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash,check_password_hash



api = Blueprint('api', __name__)


@api.route('/signup', methods=['POST'])
def add_user():
    req_Json = request.get_json()
    password_hash = generate_password_hash(req_Json["password"])
    user = User(email=req_Json["email"], password=password_hash)
    db.session.add(user)
    db.session.commit()
    return "user " + req_Json["email"] + " was created", 201

@api.route('/get_all_users/', methods=['GET'])
def get_all_users():
    users = User.query.all()
    if (users == []):
        return "users not found", 404
    else:
        users = list(map(lambda x: x.serialize(),users))
        return jsonify(users), 200


@api.route('/token', methods=['POST'])
def create_token():
    users = list(map(lambda x: x.serialize(),User.query.all()))
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    found_user=None
    for user in users:
        if user["email"] == email and check_password_hash(user["password"],password):
            found_user=user
    if found_user is  None:
        return jsonify({"msg": "Bad username or password"}), 401
    access_token = create_access_token(identity=found_user["id"])
    return jsonify({ "token": access_token, "user": found_user })