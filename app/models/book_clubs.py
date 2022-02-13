from .db import db

class BookClub(db.Model):
    __tablename__ = 'book_clubs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    capacity = db.Column(db.Integer)
    public = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # users = db.relationship('User', back_populates='book_clubs', secondary=book_clubs_members)
    # chatrooms = db.relationship('BookClubChatroom', back_populates='book_club')
