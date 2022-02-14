from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, Book

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/stuff')
def stuff():
    item = User.query.get(1)

    print(item.first_name, 'TESTETSETT')

    db.session.delete(item)
    db.session.commit()

    return {}
