import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send
from datetime import datetime

from app.models import db, ChatroomMessage

# set up cors_allowed_origins
if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://book-nook-app.herokuapp.com",
        "https://book-nook-app.herokuapp.com"
    ]
else:
    origins = "*"

# initialize socket instance
socketio = SocketIO(cors_allowed_origins=origins)

# handle chat messages
@socketio.on('chat')
def handle_chat(data):
    user_id = data['user_id']
    username = data['username']
    body = data['body']
    chatroom_id = str(data['chatroom_id'])

    if not body:
        return {'error': ['Message cannot be empty']}, 401

    chat_message = ChatroomMessage(
        body=body,
        user_id=user_id,
        chatroom_id=chatroom_id,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.session.add(chat_message)
    db.session.commit()

    print('-----------------')
    print(f'user {username} posted {body} in {chatroom_id}')
    print('-----------------')

    emit('chat', data, room=chatroom_id)

# handle room join
@socketio.on('join')
def on_join(data):
    username = data['username']
    chatroom_id = str(data['chatroom_id'])

    print('-----------------')
    print(f'user {username} wants to join chatroom #{chatroom_id}')
    print('-----------------')

    join_room(chatroom_id)

# handle room leave
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = str(data['room'])
    leave_room(room)
