from app.models import db, BookClubMember
from datetime import datetime
from random import sample

def seed_book_club_members():

    member_seeds = [
        BookClubMember(book_club_id=7, user_id=1, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=1, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=1, user_id=1, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=4, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=8, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=9, user_id=2, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=4, user_id=3, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=2, user_id=3, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=3, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=4, user_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=10, user_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=1, user_id=4, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=8, user_id=5, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=5, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=5, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=1, user_id=6, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=6, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=6, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=6, user_id=7, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=4, user_id=7, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=7, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=3, user_id=8, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=10, user_id=8, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=8, user_id=8, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=3, user_id=9, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=9, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=2, user_id=9, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=10, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=1, user_id=10, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=4, user_id=10, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=10, user_id=11, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=11, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=3, user_id=11, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=9, user_id=12, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=12, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=12, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=10, user_id=13, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=6, user_id=13, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=5, user_id=13, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=14, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=6, user_id=14, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=9, user_id=14, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=1, user_id=15, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=7, user_id=15, created_at=datetime.now(), updated_at=datetime.now()),
        BookClubMember(book_club_id=6, user_id=15, created_at=datetime.now(), updated_at=datetime.now()),
    ]

    for member in member_seeds:
        db.session.add(member)

    db.session.commit()

def undo_book_club_members():
    db.session.execute('TRUNCATE book_club_members RESTART IDENTITY CASCADE;')
    db.session.commit()
