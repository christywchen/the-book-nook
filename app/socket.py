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
    # broadcast received chat to all connected users
    emit('chat', data, broadcast=True)

# handle room join
@socketio.on('join')
def on_join(data):
    username = data['username']
    room = data['room']
    join_room(room)
    send(username + ' has entered the room.', to=room)

# handle room leave
@socketio.on('leave')
def on_leave(data):
    username = data['username']
    room = data['room']
    leave_room(room)
    send(username + ' has left the room.', to=room)
