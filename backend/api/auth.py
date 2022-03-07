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
            if check_password_hash(user.password, password):
                flash('Logged in successfully', category='succes')
                login_user(user, remember=True)
                return jsonify({"Data": "Sikeres login"})
            else:
                flash('Wrong password, try again', category='error')

        else:
            flash('email doesn\'t exist', category='error')

    return jsonify({"Data": "Sikertelen login"})



@auth.route('/sign-up', methods=["GET", "POST"])
def sign_up():
    if request.method == "POST":
        email = request.form.get('email')
        firstName = request.form.get('firstName')
        pass1 = request.form.get('password1')
        pass2 = request.form.get('password2')
        user = User.query.filter_by(email=email).first()
        if user:
            flash('User already exists', category='error')
        elif not re.fullmatch(regex, email):
            flash("Email invalid", category="error")
        elif len(firstName) < 2:
            flash("Firstname should be at least 3 characters long", category="error")
        elif pass1 != pass2:
            flash("Passwords don\'t match u dumdum", category="error")
        elif len(pass1) < 7:
            flash("Password must be at least 7 characters long", category="error")
        else:
            new_user = User(email=email, first_name=firstName,
                            password=generate_password_hash(pass1, method='sha256'))
            db.session.add(new_user)
            db.session.commit()
            login_user(user, remember=True)
            flash("Account succesfully created", category="success")
            return redirect(url_for('views.home'))
