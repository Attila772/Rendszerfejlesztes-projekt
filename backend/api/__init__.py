from flask import Flask
from flask_login.utils import login_required
from flask_sqlalchemy import SQLAlchemy
from os import path
from flask_login import LoginManager, login_manager
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView


db = SQLAlchemy()
DB_NAME = "database.db"


def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'titkositottkulcsaaaaaa'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)

    #from .views import views
    from .auth import auth

    #app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')

    from .model import User
    from .model import trade
    from .model import log
    from .model import item
    from .model import location
    from .model import category
    from .model import task
    from .model import schedule
    from .model import level

    create_db(app)
    login_manager = LoginManager()
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    admin = Admin(app, template_mode="bootstrap4")
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(trade, db.session))
    admin.add_view(ModelView(log, db.session))
    admin.add_view(ModelView(item, db.session))
    admin.add_view(ModelView(location, db.session))
    admin.add_view(ModelView(category, db.session))
    admin.add_view(ModelView(task, db.session))
    admin.add_view(ModelView(schedule, db.session))
    admin.add_view(ModelView(level, db.session))
    return app


def create_db(app):
    if not path.exists('api/' + DB_NAME):
        with app.app_context():
            db.create_all(app=app)
        print('Created Db')
