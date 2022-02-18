from app.models import db, ChatroomMessage
from datetime import datetime

def seed_chatroom_messages():
    chatmessage_1 = ChatroomMessage(
        body='Hello there',
        user_id=2,
        chatroom_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    chatmessage_2 = ChatroomMessage(
        body='This is a spoiler!!',
        user_id=2,
        chatroom_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())
    chatmessage_3 = ChatroomMessage(
        body='Hi!!! No spoilers please.',
        user_id=1,
        chatroom_id=1,
        created_at=datetime.now(),
        updated_at=datetime.now())
    chatmessage_4 = ChatroomMessage(
        body='Who read the next chapter already?',
        user_id=2,
        chatroom_id=2,
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(chatmessage_1)
    db.session.add(chatmessage_2)
    db.session.add(chatmessage_3)
    db.session.add(chatmessage_4)

    db.session.commit()


def undo_chatroom_messages():
    db.session.execute('TRUNCATE chatroom_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
