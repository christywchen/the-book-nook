from app.models import book_club_members
from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import UniqueConstraint

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40))
    dob = db.Column(db.Date)
    is_online = db.Column(db.Boolean, default=False)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    book_clubs_owned = db.relationship('BookClub', backref='user', cascade='all, delete')
    book_club_members = db.relationship('BookClubMember', backref='user', cascade='all, delete-orphan')
    book_club_suggested_books = db.relationship('BookClubBook', backref='user')
    chatroom_messages = db.relationship('ChatroomMessage', backref='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self, *args):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'dob': self.dob,
            'is_online': self.is_online,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
