from app.models import db, BookClubBook
from datetime import datetime
from random import sample

def seed_book_club_books():

    def books_seeds(book_club_id):
        nums = sample(range(1, 15), 3)

        book_club_book_1 = BookClubBook(
            book_id=nums[0],
            book_club_id=book_club_id,
            created_at=datetime.now(),
            updated_at=datetime.now())

        book_club_book_2 = BookClubBook(
            book_id=nums[1],
            book_club_id=book_club_id,
            created_at=datetime.now(),
            updated_at=datetime.now())

        book_club_book_3 = BookClubBook(
            book_id=nums[2],
            book_club_id=book_club_id,
            created_at=datetime.now(),
            updated_at=datetime.now())

        db.session.add(book_club_book_1)
        db.session.add(book_club_book_2)
        db.session.add(book_club_book_3)

    for i in range(1, 11):
        books_seeds(i)

    db.session.commit()


def undo_book_club_books():
    db.session.execute('TRUNCATE book_club_books RESTART IDENTITY CASCADE;')
    db.session.commit()
