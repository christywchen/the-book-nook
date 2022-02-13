from .db import db

class BookClub(db.Model):
    __tablename__ = 'book_clubs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    capacity = db.Column(db.Integer)
    public = db.Column(db.Boolean, default=False)

    users = db.relationship('User', back_populats='book_clubs')
