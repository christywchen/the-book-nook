from backend.models import db, BookClubMember
from datetime import datetime

def seed_book_club_members():
    book_club_member_1 = BookClubMember(
        book_club_id=1,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_member_2 = BookClubMember(
        book_club_id=1,
        user_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_member_3 = BookClubMember(
        book_club_id=2,
        user_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(book_club_member_1)
    db.session.add(book_club_member_2)
    db.session.add(book_club_member_3)

    db.session.commit()


def undo_book_club_members():
    db.session.execute('TRUNCATE book_club_members RESTART IDENTITY CASCADE;')
    db.session.commit()
