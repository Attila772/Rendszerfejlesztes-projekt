from multiprocessing.sharedctypes import Value
from re import fullmatch
from unicodedata import name
from flask_login.utils import login_required
from .model import User,level,trade,category
from flask import Blueprint, jsonify, render_template, request, flash, redirect, url_for
from . import db
from flask_login import login_user, login_required, logout_user, current_user


views = Blueprint('auth', __name__)

@views.route('/role', methods=['GET','POST','PUT','DELETE'])
def route():
    if request.method == 'POST':
        role_name = request.get_json()['role_name']
        new_role = level(name= role_name, value = 0)
        db.session.add(new_role)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'GET':
        roles = level.query.filter_by()
        response_dict = {}
        for role in roles:
            response_dict[role.id] = role.name
        response = jsonify({'Roles': response_dict})
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        role = level.query.filter_by(id = id).first()
        db.session.delete(role)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method =='PUT':
        id = request.get_json()['id']
        level.query.filter_by(id = id).first().name = request.get_json()['name']
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    pass

@views.route('/trade', methods=['GET','POST','PUT','DELETE'])
def route():
    if request.method == 'POST':
        trade_name = request.get_json()['name']
        new_trade=trade(name=trade_name)
        db.session.add(new_trade)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'GET':
        trades = trade.query.filter_by()
        response_dict = {}
        for _trade in trades:
            response_dict[_trade.id] = _trade.name
        return jsonify({'Data': response_dict})
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _trade = trade.query.filter_by(id = id).first()
        db.session.delete(_trade)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'PUT':
        id = request.get_json()['id']
        trade.query.filter_by(id = id).first().name=request.get_json()['name']
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    pass

@views.route('/category', methods=['GET','POST','PUT','DELETE'])
def route():
    if request.method == 'POST':
        category_name = request.get_json()['name']
        category_norma_time = request.get_json()['norma_time']
        category_interval = request.get_json()['interval']
        category_descript = request.get_json()['descript']
        category_qualifications = request.get_json()['qualifications']
        category_parent_id = request.get_json()['parent_id']
        new_category=category(name=category_name,
                              norma_time=category_norma_time,
                              interval=category_interval,
                              descript=category_descript,
                              qualifications=category_qualifications,
                              parent_id=category_parent_id)
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'GET':
        categories = category.query.filter_by()
        response_dict = {}
        for _category in categories:
            response_dict[_category.id]={'name': _category.name,
                                         'norma_time': _category.norma_time,
                                         'interval': _category.interval,
                                         'descript':_category.descript,
                                         'qualifications':_category.qualifications,
                                         'parent_id':_category.parent_id}
        return jsonify({'Data': response_dict})
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _category = category.query.filter_by(id = id).first()
        db.session.delete(_category)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'PUT':
        id = request.get_json()['id']
        category.query.filter_by(id = id).first().name=request.get_json()['name']
        category.query.filter_by(id = id).first().norma_time=request.get_json()['norma_time']
        category.query.filter_by(id = id).first().interval=request.get_json()['interval']
        category.query.filter_by(id = id).first().descript=request.get_json()['descript']
        category.query.filter_by(id = id).first().qualifications=request.get_json()['qualifications']
        category.query.filter_by(id = id).first().parent_id=request.get_json()['parent_id']
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    pass