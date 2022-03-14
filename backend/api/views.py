from multiprocessing.sharedctypes import Value
from re import fullmatch
from unicodedata import name
from flask_login.utils import login_required
from .model import User,level,trade,location,category,item
from flask import Blueprint, jsonify, render_template, request, flash, redirect, url_for
from . import db
from flask_login import login_user, login_required, logout_user, current_user


views = Blueprint('views', __name__)

@views.route('/role', methods=['GET','POST','PUT','DELETE'])
def role():
    if request.method == 'POST':
        role_name = request.get_json()['role_name']
        new_role = level(name= role_name, value = 0)
        db.session.add(new_role)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        roles = level.query.filter_by()
        response_dict = {}
        for role in roles:
            response_dict[role.id] = role.name
        response = jsonify({'Roles': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        role = level.query.filter_by(id = id).first()
        db.session.delete(role)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method =='PUT':
        id = request.get_json()['id']
        level.query.filter_by(id = id).first().name = request.get_json()['name']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass

@views.route('/location', methods=['GET', 'POST','PUT','DELETE'])
def location_():
    if request.method == 'POST':
        name = request.get_json()['building']
        room = request.get_json()['room']
        new_loc = location(building= name, rooms = room)
        db.session.add(new_loc)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        locations = location.query.filter_by()
        response_dict = {}
        for _location in locations:
            response_dict[_location.id] = [_location.building,_location.rooms]
        response = jsonify({'Locations': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _location = location.query.filter_by(id = id).first()
        db.session.delete(_location)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method =='PUT':
        id = request.get_json()['id']
        location.query.filter_by(id = id).first().building = request.get_json()['building']
        location.query.filter_by(id = id).first().rooms = request.get_json()['room']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass

@views.route('/trade', methods=['GET','POST','PUT','DELETE'])
def trade_():
    if request.method == 'POST':
        trade_name = request.get_json()['name']
        new_trade=trade(name=trade_name)
        db.session.add(new_trade)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        trades = trade.query.filter_by()
        response_dict = {}
        for _trade in trades:
            response_dict[_trade.id] = _trade.name
        response = jsonify({'Data': response_dict}) 
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _trade = trade.query.filter_by(id = id).first()
        db.session.delete(_trade)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        id = request.get_json()['id']
        trade.query.filter_by(id = id).first().name=request.get_json()['name']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass

@views.route('/category', methods=['GET','POST','PUT','DELETE'])
def category_():
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
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
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
        response = jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return  response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _category = category.query.filter_by(id = id).first()
        db.session.delete(_category)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        id = request.get_json()['id']
        category.query.filter_by(id = id).first().name=request.get_json()['name']
        category.query.filter_by(id = id).first().norma_time=request.get_json()['norma_time']
        category.query.filter_by(id = id).first().interval=request.get_json()['interval']
        category.query.filter_by(id = id).first().descript=request.get_json()['descript']
        category.query.filter_by(id = id).first().qualifications=request.get_json()['qualifications']
        category.query.filter_by(id = id).first().parent_id=request.get_json()['parent_id']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass

@views.route('/item', methods=['GET','POST','PUT','DELETE'])
def item_():
    if request.method == 'POST':
        item_name = request.get_json()['name']
        item_descript = request.get_json()['descript']
        item_category = request.get_json()['category']
        item_location= request.get_json()['location']
        new_item=item(name=item_name,
                      descript=item_descript, 
                      category= item_category,
                      location=item_location)
        db.session.add(new_item)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        items = item.query.filter_by()
        response_dict = {}
        for _item in items:
            response_dict[_item.id]={'name': _item.name,
                                     'descript': _item.descript,
                                     'category': _item.category,
                                     'location': _item.location}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _item = item.query.filter_by(id = id).first()
        db.session.delete(_item)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        id = request.get_json()['id']
        item.query.filter_by(id = id).first().name=request.get_json()['name']
        item.query.filter_by(id = id).first().descript=request.get_json()['descript']
        item.query.filter_by(id = id).first().category=request.get_json()['category']
        item.query.filter_by(id = id).first().location=request.get_json()['location']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass