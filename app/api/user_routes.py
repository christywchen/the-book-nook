from flask import Blueprint, jsonify
from flask_login import login_required

from app.services import UserService, BookClubMemberService

user_routes = Blueprint('users', __name__)


@user_routes.route('')
@login_required
def users():
    """
    Returns all users.
    """
    users = UserService.get_all_users()

    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Returns one user.
    """
    user = UserService.get_one_user(id)

    return user.to_dict()


@user_routes.route('/<int:id>/book-clubs')
@login_required
def user_book_clubs(id):
    """
    Returns all of a user's book club memberships.
    """
    bookClubMemberships = BookClubMemberService.get_user_book_clubs(id)

    return {'book club memberships': [membership.to_dict() for membership in bookClubMemberships]}
