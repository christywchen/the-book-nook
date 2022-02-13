from .db import db
from sqlalchemy import UniqueConstraint

class BookClubMember(db.Model):
    __tablename__ = 'book_clubs_members'
    __table_args__ = (
        UniqueConstraint('book_club_id', 'user_id', name='book_club_member'),
    )

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_club_id = db.Column('book_club_id', db.Integer, db.ForeignKey('book_clubs.id'), primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
    created_at = db.Column('created_at', db.DateTime, nullable=False)
    updated_at = db.Column('updated_at', db.DateTime, nullable=False)

    book_club = db.relationship('BookClub', backref='members')
    member = db.relationship('User', backref='book_clubs')


# book_clubs_members = db.Table(
#     'book_clubs_members',
#     db.Column('book_club_id', db.Integer, db.ForeignKey('book_clubs.id'), primary_key=True),
#     db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
#     db.Column('created_at', db.DateTime, nullable=False),
#     db.Column('updated_at', db.DateTime, nullable=False),
# )
