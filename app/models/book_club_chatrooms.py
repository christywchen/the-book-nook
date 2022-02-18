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


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "book_club_id": self.book_club_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


    def __repr__(self):
        return f"<class 'Book Club Chatroom', id: {self.id}, name: {self.name}, description: {self.description}, book_club_id: {self.book_club_id}, created_at: {self.created_at}, updated_at: {self.updated_at}>"
