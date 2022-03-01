from datetime import datetime

from app.models import db, BookClubBook


class BookClubBookService:
    """
    Services the Book Club Books model.
    """

    def create_book_club_book(data):
        """
        Creates a new book club book record.
        """
        book_club_book = BookClubBook(
            book_club_id=data['book_club_id'],
            book_id=data['book_id'],
            added_by_id=data['added_by_id'],
            status=data['status'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book_club_book)
        db.session.commit()

        return book_club_book


    def get_all_book_club_books():
        """
        Queries for all book club books.
        """
        all_book_club_books = BookClubBook.query.all()

        return all_book_club_books


    def get_book_by_club(book_club_id, book_id):
        """
        Queries for a book club book by book club id and book id.
        """
        book_club_book = BookClubBook.query.filter(BookClubBook.book_id == book_id, BookClubBook.book_club_id == book_club_id).first()

        return book_club_book


    def get_books_by_club(book_club_id):
        """
        Queries for book club books by book club id.
        """
        book_club_books = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id).all()

        return book_club_books


    def update_book_club_book(book_club_book, data):
        """
        Updates a book club book's read status.
        Status codes:
            1: Upcoming
            2: Reading
            3: Finished
        """
        book_club_book.status = data['status']

        db.session.commit()

        return book_club_book


    def delete_book_club_book(book_club_id, book_id):
        """
        Deletes a book club book record.
        """
        book_club_book = BookClubBook.query.filter(BookClubBook.book_club_id == book_club_id, BookClubBook.book_id == book_id).first()
        book_club_book_id = book_club_book.id

        db.session.delete(book_club_book)
        db.session.commit()

        return book_club_book_id
