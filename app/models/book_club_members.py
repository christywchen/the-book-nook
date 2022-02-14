from .db import db
from sqlalchemy import UniqueConstraint

class BookClubMember(db.Model):
    __tablename__ = 'book_club_members'
    __table_args__ = (
        UniqueConstraint('book_club_id', 'user_id', name='book_club_member'),
    )

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_club_id = db.Column('book_club_id', db.Integer, db.ForeignKey('book_clubs.id'), primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
    status = db.Column(db.String(20), nullable=False, default='Pending')
    created_at = db.Column('created_at', db.DateTime, nullable=False)
    updated_at = db.Column('updated_at', db.DateTime, nullable=False)
