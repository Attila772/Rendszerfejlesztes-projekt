from multiprocessing.sharedctypes import Value
from re import fullmatch
from unicodedata import name
from flask_login.utils import login_required
from .model import User,level,trade,location
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

@views.route('/location', methods=['GET', 'POST','PUT','DELETE'])
def _location():
    if request.method == 'POST':
        name = request.get_json()['building']
        room = request.get_json()['rooms']
        new_loc = location(building= name, rooms = room)
        db.session.add(new_loc)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'GET':
        locations = location.query.filter_by()
        response_dict = {}
        for _location in locations:
            response_dict[_location.id] = [_location.building,_location.rooms]
        response = jsonify({'Locations': response_dict})
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _location = location.query.filter_by(id = id).first()
        db.session.delete(_location)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method =='PUT':
        id = request.get_json()['id']
        location.query.filter_by(id = id).first().building = request.get_json()['building']
        location.query.filter_by(id = id).first().rooms = request.get_json()['room']
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    pass

@views.route('/trade', methods=['GET','POST','PUT','DELETE'])
def route():
    if request.method == 'POST':
        trade_name = request.get_json()['trade_name']
        new_trade=trade(name=trade_name)
        db.session.add(new_trade)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'GET':
        trades = trade.query.filter_by()
        response_dict = {}
        for _trade in trades:
            response_dict[_trade.id] = _trade.name
        response = jsonify({'Trades': response_dict})
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _trade = trade.query.filter_by(id = id).first()
        db.session.delete(_trade)
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    elif request.method == 'PUT':
        id = request.get_json()['id']
        trade.query.filter_by(id = id).first().name=request.get_json()['trade_name']
        db.session.commit()
        return jsonify({'Data':'Sikeres'})
    pass