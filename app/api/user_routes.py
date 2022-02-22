from flask import Blueprint, jsonify
from flask_login import login_required

from app.models import db, User, BookClub
from app.models.book_club_members import BookClubMember

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>/book-clubs')
@login_required
def user_book_clubs(id):
    bookClubMemberships = BookClubMember.query.filter(BookClubMember.user_id == id).all()

    return {'book club memberships': [membership.to_dict() for membership in bookClubMemberships]}
