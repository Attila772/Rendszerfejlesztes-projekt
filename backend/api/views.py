from multiprocessing.sharedctypes import Value
from re import fullmatch
from unicodedata import name
from flask_cors import CORS
from flask_login.utils import login_required
from sqlalchemy import false, true
from .model import User,level,trade,location,category,item,task,schedule,log
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
            response_dict[role.id] = {'id':role.id,'name':role.name}
        response = jsonify({'Data': response_dict})
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
            response_dict[_location.id] = {'id':_location.id,'building':_location.building,'room':_location.rooms}
        response = jsonify({'Data': response_dict})
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
            response_dict[_trade.id] = {'id':_trade.id,'name':_trade.name}
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
        category_qualifications = request.get_json()['qualification']
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
            response_dict[_category.id]={'id': _category.id,
                                         'name': _category.name,
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
        item_location = request.get_json()['location']
        new_task=item(name=item_name,
                      descript=item_descript, 
                      category=item_category,
                      location= item_location)
        db.session.add(new_task)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        items = item.query.filter_by()
        response_dict = {}
        for _item in items:
            response_dict[_item.id]={'id': _item.id,
                                     'name': _item.name,
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

@views.route('/task', methods=['GET','POST','PUT','DELETE'])
def task_():
    if request.method == 'POST':
        task_name = request.get_json()['name']
        task_priority = request.get_json()['priority']
        task_item = request.get_json()['item']
        new_task=task(name=task_name,
                      priority=task_priority, 
                      item=task_item)
        task_exists = false
        _tasks=task.query.filter_by()
        for _task in _tasks:
            if task.item == task_item:
                task_exists=true
        if task_exists:
            db.session.delete(task.query.filter_by(item = task_item).first())
        db.session.add(new_task)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'GET':
        tasks = task.query.filter_by()
        response_dict = {}
        for _task in tasks:
            response_dict[_task.id]={'id': _task.id,
                                     'name': _task.name,
                                     'priority': _task.priority,
                                     'item': _task.item}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'DELETE':
        id = request.get_json()['id']
        _task = task.query.filter_by(id = id).first()
        db.session.delete(_task)
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    elif request.method == 'PUT':
        id = request.get_json()['id']
        task.query.filter_by(id = id).first().name=request.get_json()['name']
        task.query.filter_by(id = id).first().descript=request.get_json()['priority']
        task.query.filter_by(id = id).first().category=request.get_json()['item']
        db.session.commit()
        response = jsonify({'Data':'Sikeres'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    pass

#basic functions for schedule model class
@views.route('/schedule', methods=['GET','POST','PUT','DELETE'])
def schedule_():
        if request.method == 'POST':
            user_id = request.get_json()['user_id']
            from_date = request.get_json()['from_date']
            length = request.get_json()['length']
            state = request.get_json()['state']
            task_id = request.get_json()['task_id']
            new_schedule=schedule(user_id=user_id,
                        from_date=from_date, 
                        length=length,
                        state= state,
                        task=task_id)
            db.session.add(new_schedule)
            db.session.commit()
            response = jsonify({'Data':'Sikeres'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        elif request.method == 'GET':
            schedules = schedule.query.filter_by()
            response_dict = {}
            for _item in schedules:
                response_dict[_item.id]={'id': _item.id,
                                        'user_id': _item.user_id,
                                        'from_date': _item.from_date,
                                        'length': _item.length,
                                        'state': _item.state,
                                        'task_id': _item.task}
            response =  jsonify({'Data': response_dict})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        elif request.method == 'DELETE':
            id = request.get_json()['id']
            _item = schedule.query.filter_by(id = id).first()
            db.session.delete(_item)
            db.session.commit()
            response = jsonify({'Data':'Sikeres'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response
        elif request.method == 'PUT':
            id = request.get_json()['id']
            schedule.query.filter_by(id = id).first().name=request.get_json()['user_id']
            schedule.query.filter_by(id = id).first().descript=request.get_json()['from_date']
            schedule.query.filter_by(id = id).first().category=request.get_json()['length']
            schedule.query.filter_by(id = id).first().location=request.get_json()['state']
            schedule.query.filter_by(id = id).first().location=request.get_json()['task_id']
            db.session.commit()
            response = jsonify({'Data':'Sikeres'})
            response.headers.add('Access-Control-Allow-Origin', '*')
            return response


    # get Item by id
@views.route('/itemid/<int:id>', methods=['GET'])
def get_item(id):
        _item = item.query.filter_by(id = id).first()
        response_dict = {'id': _item.id,
                        'name': _item.name,
                        'descript': _item.descript,
                        'category': _item.category,
                        'location': _item.location}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # get task by id
@views.route('/taskid', methods=['GET'])
def get_task(id):
        _task = task.query.filter_by(id = id).first()
        response_dict = {'id': _task.id,
                        'name': _task.name,
                        'priority': _task.priority,
                        'item': _task.item}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # get schedule by id
@views.route('/scheduleid/<int:id>', methods=['GET'])
def get_schedule(id):
        _schedule = schedule.query.filter_by(id = id).first()
        response_dict = {'id': _schedule.id,
                        'user_id': _schedule.user_id,
                        'from_date': _schedule.from_date,
                        'length': _schedule.length,
                        'state': _schedule.state,
                        'task_id': _schedule.task_id}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    
    # get category by id
@views.route('/categoryid/<int:id>', methods=['GET'])
def get_category(id):
        _category = category.query.filter_by(id = id).first()
        response_dict = {'id': _category.id,
                        'name': _category.name,
                        'interval': _category.interval,
                        'qualification': _category.qualifications,
                        'normal_time': _category.norma_time,
                        'parent_id': _category.parent_id,
                        'descript': _category.descript}
        response =  jsonify({'Data': response_dict})
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response
    


#basic functions for schedule model class
   