from .db import db

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(75), nullable=False)
    author = db.Column(db.String(75), nullable=False)
    description = db.Column(db.Text)
    image_url = db.Column(db.Text)
    isbn = db.Column(db.BigInteger)
    isbn13 = db.Column(db.BigInteger)
    original_title = db.Column(db.String(75))
    language = db.Column(db.String(20), nullable=False)
    publication_year = db.Column(db.Integer)
    pages = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    book_club_books = db.relationship('BookClubBook', backref='book', cascade='all, delete-orphan')
