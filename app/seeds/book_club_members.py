from app.models import db, BookClubMember
from datetime import datetime
from random import sample

def seed_book_club_members():

    def member_seeds(user_id):
        nums = sample(range(1, 11), 3)
        memberships = {num: BookClubMember(
            book_club_id=num,
            user_id=user_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        ) for num in nums}

        for key, val in memberships.items():
            key = val
            db.session.add(key)

    for i in range(1, 16):
        member_seeds(i)

    db.session.commit()

def undo_book_club_members():
    db.session.execute('TRUNCATE book_club_members RESTART IDENTITY CASCADE;')
    db.session.commit()
