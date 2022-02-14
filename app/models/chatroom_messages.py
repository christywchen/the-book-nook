from .db import db

class ChatroomMessage(db.Model):
    __tablename__ = 'chatroom_messages'

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    chatroom_id = db.Column(db.Integer, db.ForeignKey('book_club_chatrooms.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
