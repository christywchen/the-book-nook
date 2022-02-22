from app.models import db, BookClub
from datetime import datetime

def seed_book_clubs():
    book_club_1 = BookClub(
        name='The Quarantine Club', host_id=1, description='Just a group of people reading during quarantine.', capacity=5, created_at=datetime.now(), updated_at=datetime.now())
    book_club_2 = BookClub(
        name='Westside Stories', host_id=1, description='For anyone who enjoys reading plays and watching musicals.', capacity=8, created_at=datetime.now(), updated_at=datetime.now())
    book_club_3 = BookClub(
        name='Between the Lines', host_id=2, description='Not your average book club.', capacity=10, created_at=datetime.now(), updated_at=datetime.now())
    book_club_4 = BookClub(
        name='Tequila Mockingbird', host_id=2, description='BYOB. Weekly meetings, happy hour included.', capacity=5, created_at=datetime.now(), updated_at=datetime.now())
    book_club_5 = BookClub(
        name='The Reader\'s Dozen', host_id=3, description='Twelve people maximum please.', capacity=12, created_at=datetime.now(), updated_at=datetime.now())
    book_club_6 = BookClub(
        name='The Final Chapter', host_id=3, capacity=5, created_at=datetime.now(), updated_at=datetime.now())
    book_club_7 = BookClub(
        name='The Page Turners',  host_id=4, description='For anyone who wants to read at their own pace but have a place to discuss.', capacity=10, created_at=datetime.now(), updated_at=datetime.now())
    book_club_8 = BookClub(
        name='Read the Thing', host_id=4, capacity=15, created_at=datetime.now(), updated_at=datetime.now())
    book_club_9 = BookClub(
        name='A Novel Idea', host_id=5, description='Not your average book club.', capacity=8, created_at=datetime.now(), updated_at=datetime.now())
    book_club_10 = BookClub(
        name='Reader\'s Delight', host_id=6, description='Not your average book club.', capacity=8, created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(book_club_1)
    db.session.add(book_club_2)
    db.session.add(book_club_3)
    db.session.add(book_club_4)
    db.session.add(book_club_5)
    db.session.add(book_club_6)
    db.session.add(book_club_7)
    db.session.add(book_club_8)
    db.session.add(book_club_9)
    db.session.add(book_club_10)

    db.session.commit()


def undo_book_clubs():
    db.session.execute('TRUNCATE book_clubs RESTART IDENTITY CASCADE;')
    db.session.commit()
