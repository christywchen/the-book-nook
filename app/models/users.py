from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy import UniqueConstraint

# book_clubs_members = db.Table(
#     'book_clubs_members',
#     db.Column('book_club_id', db.Integer, db.ForeignKey('book_clubs.id'), primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('created_at', db.DateTime, nullable=False),
#     db.Column('updated_at', db.DateTime, nullable=False),
#     UniqueConstraint('book_club_id', 'user_id', name='club_member')
# )

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(255), nullable=False)
    dob = db.Column(db.Date)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    # book_clubs = db.relationship('BookClub', back_populates='users', secondary=book_clubs_members)
    # messages = db.relationship('ChatroomMessage', back_populates='user')


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
