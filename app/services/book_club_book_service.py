from datetime import datetime

from app.models import book_club_books, db, BookClubBook


class BookClubBookService:
    """
    Services the Book Club Books model.
    """

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
