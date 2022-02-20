from app.models import db, BookClubChatroom
from datetime import datetime

def seed_book_club_chatrooms():

    general_rooms = {i: BookClubChatroom(
        name='General',
        book_club_id=i,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ) for i in range(1, 11)}

    spoiler_rooms = {i: BookClubChatroom(
        name='Spoilers',
        book_club_id=i,
        created_at=datetime.now(),
        updated_at=datetime.now()
    ) for i in range(1, 11)}

    for key, val in general_rooms.items():
        key = val
        db.session.add(key)

    for key, val in spoiler_rooms.items():
        key = val
        db.session.add(key)

    db.session.commit()


def undo_book_club_chatrooms():
    db.session.execute('TRUNCATE book_club_chatrooms RESTART IDENTITY CASCADE;')
    db.session.commit()
