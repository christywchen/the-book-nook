from flask import Blueprint
from flask_login import login_required
from app.models import db, BookClubChatroom

chatroom_routes = Blueprint('chatroom', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{error}')
    return errorMessages


"""
The routes below are for interacting with chatrooms.
"""

@chatroom_routes.route('')
@login_required
def get_all_chatrooms():
    """
    Returns all chatrooms in the database.
    """
    all_chatrooms = BookClubChatroom.query.all()

    return {'chatrooms': [chatroom.to_dict() for chatroom in all_chatrooms]}


@chatroom_routes.route('/<int:id>')
@login_required
def get_chatroom():
    """
    Returns the requested chatroom.
    """
    chatroom = BookClubChatroom.query.get(id)

    return {'chatroom': [chatroom.to_dict()]}
