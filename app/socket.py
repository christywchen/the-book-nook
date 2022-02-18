import os
from flask_socketio import SocketIO, emit

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
