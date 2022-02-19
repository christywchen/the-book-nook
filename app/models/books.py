from .db import db

class Book(db.Model):
    __tablename__ = 'books'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(75), nullable=False)
    author = db.Column(db.String(75), nullable=False)
    synopsis = db.Column(db.Text)
    image_url = db.Column(db.Text)
    isbn13 = db.Column(db.String(13))
    original_title = db.Column(db.String(75))
    language = db.Column(db.String(20), nullable=False)
    publication_year = db.Column(db.Integer)
    pages = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    book_club_books = db.relationship('BookClubBook', backref='book', cascade='all, delete-orphan')


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "synopsis": self.synopsis,
            "image_url": self.image_url,
            "isbn13": self.isbn13,
            "original_title": self.original_title,
            "language": self.language,
            "publication_year": self.publication_year,
            "pages": self.pages,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


    def __repr__(self):
        return f"<class 'Book', id: {self.id}, name: {self.title}, author: {self.author}, synopsis: {self.synopsis}, image_url: {self.image_url}, isbn13: {self.isbn13}, original_title: {self.original_title}, language: {self.language}, publication_year: {self.publication_year}, pages: {self.pages}, created_at: {self.created_at}, updated_at: {self.updated_at}>"
