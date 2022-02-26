from flask import Blueprint
from flask_login import login_required

from app.models import db, BookClubChatroom, ChatroomMessage

from app.services import ChatroomService

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
    all_chatrooms = ChatroomService.get_all_chatrooms()

    return {'chatrooms': [chatroom.to_dict() for chatroom in all_chatrooms]}


@chatroom_routes.route('/<int:id>')
@login_required
def get_chatroom(id):
    """
    Returns the requested chatroom.
    """
    chatroom = ChatroomService.get_one_chatroom(id)

    return {'chatroom': [chatroom.to_dict()]}


"""
The routes below are for interacting with the messages of a chatroom.
"""

@chatroom_routes.route('/<int:id>/messages')
@login_required
def get_chatroom_messages(id):
    """
    Returns all messages that belong to a given chatroom.
    """
    chatroom_messages = ChatroomMessage.query.filter(ChatroomMessage.chatroom_id == id).all()

    return {'chat messages': [chat_message.to_dict() for chat_message in chatroom_messages]}
