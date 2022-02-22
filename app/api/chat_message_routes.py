from flask import Blueprint, request
from flask_login import login_required
from datetime import datetime

from app.models import db, ChatroomMessage
from app.forms.chat_message_form import ChatMessageForm


chat_message_routes = Blueprint('chat_mesages', __name__)


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
The below routes are for creating, updating, and deleting chat messages.
"""

@chat_message_routes.route('', methods=['POST'])
@login_required
def create_chat_message():
    """
    Creates a chat message in the database and returns it.
    """
    form = ChatMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data

        chat_message = ChatroomMessage(
            body=data['body'],
            user_id=data['user_id'],
            chatroom_id=data['chatroom_id'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(chat_message)
        db.session.commit()

        return {'chat message': chat_message.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@chat_message_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_chat_message():
    """
    Updates a chat message record and returns it.
    """
    form = ChatMessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        chat_message = ChatroomMessage.query.get(id)
        data = form.data

        chat_message.body = data['body']
        chat_message.updated_at = datetime.now()

        db.session.commit()

        return {'chat message': chat_message.to_dict()}

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@chat_message_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_chat_message(id):
    """
    Deletes a chat message record.
    """
    chat_message = ChatroomMessage.query.get(id)

    db.session.delete(chat_message)
    db.session.commit()

    return {'message': 'Chat message successfully deleted.'}
