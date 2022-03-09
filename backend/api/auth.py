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
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email=email).first()
        if user:
            if (user.password == password):
                login_user(user, remember=True)
                return jsonify({"Data": "Sikeres login"})
            else:
                return jsonify({"Data": "BAD_CREDENTIALS"})
        else:
            return jsonify({"Data": "USER_NOT_FOUND"})

    return jsonify({"Data": "BAD_CREDENTIALS"})

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
        email = request.form.get('email')
        pass1 = request.form.get('password1')
        pass2 = request.form.get('password2')
        user = User.query.filter_by(email=email).first()
        trade = request.form.get('trade')
        level = request.form.get('level')
        if user:
             return jsonify({"Data": "van mar ilyen user"})
        elif not re.fullmatch(regex, email):
             return jsonify({"Data": "email nem valid"})
        elif pass1 != pass2:
             return jsonify({"Data": "jelszavak nem ugyanazok"})
        elif len(pass1) < 7:
             return jsonify({"Data": "jelszo nincs 7 karakter"})
        else:
            new_user = User(email=email, trade=trade,level=level,
                            password=pass1)
            db.session.add(new_user)
            db.session.commit()
            login_user(user, remember=True)
            return jsonify({"Data": "Sikeres regisztráció"})
