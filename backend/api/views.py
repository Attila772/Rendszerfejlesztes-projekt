from multiprocessing.sharedctypes import Value
from re import fullmatch
from unicodedata import name
from flask_login.utils import login_required
from .model import User,level
from flask import Blueprint, jsonify, render_template, request, flash, redirect, url_for
from . import db
from flask_login import login_user, login_required, logout_user, current_user


views = Blueprint('auth', __name__)

@views.route('/role', methods=['GET','POST','PUT','DELETE'])
def route():
    if request.method == 'POST':
        role_name = request.form['role_name']
        new_role = level(name= role_name, value = 0)
        db.session.add(new_role)
        db.session.commit()
    elif request.method == 'GET':
        roles = level.query.filter_by()
        response_dict = {}
        for role in roles:
            response_dict[role.id] = role.name
        response = jsonify({'Roles': response_dict})
    elif request.method == 'DELETE':
        id = request.form['id']
        role = level.query.filter_by(id = id).first()
        db.session.delete(role)
        db.session.commit()
    elif request.method =='PUT':
        id = request.form['id']
    pass


