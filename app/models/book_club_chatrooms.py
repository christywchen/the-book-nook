from .db import db

class BookClubChatroom(db.Model):
    __tablename__ = 'book_club_chatrooms'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20), nullable=False)
    description = db.Column(db.Text)
    book_club_id = db.Column(db.Integer, db.ForeignKey('book_clubs.id'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    chatroom_messages = db.relationship('ChatroomMessage', backref='book_club_chatroom', cascade='all, delete')
