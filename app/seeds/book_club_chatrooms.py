from app.models import db, BookClubChatroom
from datetime import datetime

def seed_book_club_chatrooms():
    book_club_1_chatroom_1 = BookClubChatroom(
        name='General',
        book_club_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_1_chatroom_2 = BookClubChatroom(
        name='Spoilers',
        book_club_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_2_chatroom_1 = BookClubChatroom(
        name='General',
        book_club_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_club_2_chatroom_2 = BookClubChatroom(
        name='Spoilers',
        book_club_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(book_club_1_chatroom_1)
    db.session.add(book_club_1_chatroom_2)
    db.session.add(book_club_2_chatroom_1)
    db.session.add(book_club_2_chatroom_2)

    db.session.commit()


def undo_book_club_chatrooms():
    db.session.execute('TRUNCATE book_club_chatrooms RESTART IDENTITY CASCADE;')
    db.session.commit()
