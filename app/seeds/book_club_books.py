from app.models import db, BookClubBook
from datetime import datetime

def seed_book_club_books():
    book_club_book_1 = BookClubBook(
        book_id=1,
        book_club_id=1,
        added_by_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_book_2 = BookClubBook(
        book_id=1,
        book_club_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_book_3 = BookClubBook(
        book_id=2,
        book_club_id=2,
        added_by_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(book_club_book_1)
    db.session.add(book_club_book_2)
    db.session.add(book_club_book_3)

    db.session.commit()


def undo_book_club_books():
    db.session.execute('TRUNCATE book_club_books RESTART IDENTITY CASCADE;')
    db.session.commit()
