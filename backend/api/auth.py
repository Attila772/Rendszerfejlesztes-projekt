from re import fullmatch
from flask_login.utils import login_required
from .model import User
from flask import Blueprint, jsonify, render_template, request, flash, redirect, url_for
import re
from . import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, login_required, logout_user, current_user

regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
auth = Blueprint('auth', __name__)


@auth.route('/login', methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        email = request.get_json()['email']
        password = request.get_json()['password']
        user = User.query.filter_by(email=email).first()
        if user:
            if (user.password == password):
                login_user(user, remember=True)
                response = jsonify({"Data": "Sikeres login"})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
            else:
                response = jsonify({"Data": "BAD_CREDENTIALS"})
                response.headers.add('Access-Control-Allow-Origin', '*')
                return response
        else:
            response =  jsonify({"Data": "USER_NOT_FOUND"})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response

    response =  jsonify({"Data": "BAD_CREDENTIALS"})
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

    """USER
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    trade = db.Column(db.Integer, db.ForeignKey('trade.id'))
    level = db.Column(db.Integer, db.ForeignKey('level.id'))
    logs = db.relationship('log')
    schedule = db.relationship('schedule')
    """

@auth.route('/sign-up', methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        email = request.get_json()['email']
        pass1 = request.get_json()['password']
        user = User.query.filter_by(email=email).first()
        trade = request.get_json()['trade']
        level = request.get_json()['level']
        if user:
             response = jsonify({"Data": "van mar ilyen user"})
             response.headers.add('Access-Control-Allow-Origin', '*')
             return response
        else:
            new_user = User(email=email, trade=trade,level=level,
                            password=pass1)
            db.session.add(new_user)
            db.session.commit()
            login_user(new_user, remember=True)
            response =  jsonify({"Data": "Sikeres regisztráció"})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
    if request.method == "GET":
        users = User.query.filter_by()
        response_dict = {}
        for user in users:
            response_dict[user.id] = {'id':user.id,'email': user.email, 'password': user.password,'trade':user.trade,'level': user.level}
        response = jsonify({"Data": response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    if request.method == "PUT":
        user = User.query.filter_by(id = request.get_json()['id']).first()
        user.email = request.get_json()['email']
        user.password = request.get_json()['email']
        user.trade = request.get_json()['trade']
        user.level = request.get_json()['level']
        db.session.commit()
        response =  jsonify({"Data": "Sikeres regisztráció"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    if request.method == "DELETE":
        user = User.query.filter_by(id = request.get_json()['id'])
        db.session.delete(user)
        db.session.commit()
        response =  jsonify({"Data": "Sikeres regisztráció"})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response