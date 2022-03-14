from datetime import datetime

from app.models import db, Book

class BookService:
    """
    Services the Book model.
    """

    def create_book(data):
        """
        Creates a new book record.
        """
        book = Book(
            title=data['title'],
            author=data['author'],
            synopsis=data['synopsis'],
            image_url=data['image_url'],
            isbn13=data['isbn13'],
            original_title=data['original_title'],
            language=data['language'],
            publication_year=data['publication_year'],
            pages=data['pages'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book)
        db.session.commit()

        return book


    def get_all_books():
        """
        Queries for all books.
        """
        all_books = Book.query.all()

        return all_books


    def get_one_book(book_id):
        """
        Queries for one book.
        """
        book = Book.query.get(book_id)

        return book


    def update_book(book, data):
        """
        Updates a book record.
        """
        book.title = data['title']
        book.author = data['author']
        book.synopsis = data['synopsis']
        book.image_url = data['image_url']
        book.isbn13 = data['isbn13']
        book.original_title = data['original_title']
        book.language = data['language']
        book.publication_year = data['publication_year']
        book.pages = data['pages']
        book.updated_at=datetime.now()

        db.session.commit()

        return book


    def delete_book(book_id):
        """
        Delete a book record.
        """
        book = Book.query.get(book_id)

        db.session.delete(book)
        db.session.commit()

        return book_id
