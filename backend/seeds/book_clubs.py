from backend.models import db, BookClub
from datetime import datetime

def seed_book_clubs():
    book_club_1 = BookClub(
        name='The Quarantine Club', host_id=1, description='Reading is so fun. Reading is so fun.', capacity=5, public=True, created_at=datetime.now(), updated_at=datetime.now())
    book_club_2 = BookClub(
        name='Westside Stories', host_id=2, capacity=5, created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(book_club_1)
    db.session.add(book_club_2)

    db.session.commit()


def undo_book_clubs():
    db.session.execute('TRUNCATE book_clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
