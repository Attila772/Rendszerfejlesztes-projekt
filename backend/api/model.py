from enum import unique
from flask_login import UserMixin
from sqlalchemy.sql import func
from . import db


class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    trade = db.Column(db.Integer, db.ForeignKey('trade.id'))
    level = db.Column(db.Integer, db.ForeignKey('level.id'))
    logs = db.relationship('log')
    schedule = db.relationship('schedule')


class trade(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))


class log(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


class item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    category = db.Column(db.Integer, db.ForeignKey('category.id'))
    descript = db.Column(db.String(150))
    location = db.Column(db.Integer, db.ForeignKey('location.id'))


class location(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    building = db.Column(db.String(150))
    rooms = db.Column(db.String(150))


class category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    norma_time = db.Column(db.Integer) #percekben 
    interval = db.Column(db.Integer)
    # day/ month / year => where x = int
    interval_step = db.Column(db.String(150))
    descript = db.Column(db.String(150))
    qualifications = db.Column(db.Integer, db.ForeignKey('trade.id'))
    parent_id = db.Column(db.Integer)


class task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    priority = db.Column(db.Integer)
    item = db.Column(db.Integer, db.ForeignKey('item.id'))


class schedule(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    from_date = db.Column(db.String(150))
    length = db.Column(db.Integer)
    state = db.Column(db.String(150))
    task = db.Column(db.Integer, db.ForeignKey('task.id'))


class level(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150))
    value = db.Column(db.Integer)
