import os
from flask_socketio import SocketIO, emit, join_room, leave_room, send

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
    username = data['username']
    msg = data['msg']
    room = str(data['room'])
    print('-----------------')
    print(f'user {username} posted {msg}')
    print('-----------------')

    emit('chat', data, room=room)

# handle room join
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = str(data['room'])
    join_room(room)
    print('-----------------')
    print(f'user {username} wants to join chatroom #{room}')
    print('-----------------')

# handle room leave
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = str(data['room'])
    leave_room(room)
