from .db import db
from sqlalchemy import UniqueConstraint

class BookClubBook(db.Model):
    __tablename__ = 'book_club_books'
    __table_args__ = (
        UniqueConstraint('book_id', 'book_club_id', name='book_club_book'),
    )

    id = db.Column(db.Integer, primary_key=True)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    book_club_id = db.Column(db.Integer, db.ForeignKey('book_clubs.id'), nullable=False)
    added_by_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    status = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)
