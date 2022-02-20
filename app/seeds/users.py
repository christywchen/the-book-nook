from app.models import db, User
from datetime import datetime

# Adds a demo user, you can add other users here if you want
def seed_users():
    user_1 = User(
        username='demo', email='demo@demo.io', first_name='Demo', last_name='User', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_2 = User(
        username='jenna', email='jenna@jenna.io', first_name='Jenna', last_name='Lee', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_3 = User(
        username='paul', email='paul@paul.io', first_name='Paul', last_name='Smith', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_4 = User(
        username='nico', email='nico@nico.io', first_name='Nico', last_name='Pan', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_5 = User(
        username='aria', email='aria@aria.io', first_name='Aria', last_name='Winthrop', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_6 = User(
        username='lisa', email='lisa@lisa.io', first_name='Lisa', last_name='Como', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_7 = User(
        username='lucille', email='lucille@lucille.io', first_name='Lucille', last_name='Wong', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_8 = User(
        username='marisa', email='marisa@marisa.io', first_name='Marisa', last_name='Neilson', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_9 = User(
        username='kimberly', email='kimberly@kimberly.io', first_name='Kimberly', last_name='Grimaldi', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_10 = User(
        username='carmen', email='carmen@carmen.io', first_name='Carmen', last_name='San Diego', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_11 = User(
        username='eric', email='eric@eric.io', first_name='Eric', last_name='Sayer', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_12 = User(
        username='jack', email='jack@jack.io', first_name='Jack', last_name='Larson', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_13 = User(
        username='steph', email='steph@steph.io', first_name='Steph', last_name='Neri', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_14 = User(
        username='frank', email='frank@frank.io', first_name='Frank', last_name='Lin', password='password', created_at=datetime.now(), updated_at=datetime.now())
    user_15 = User(
        username='neil', email='neil@neil.io', first_name='Aria', last_name='Thatcher', password='password', created_at=datetime.now(), updated_at=datetime.now())

    db.session.add(user_1)
    db.session.add(user_2)
    db.session.add(user_3)
    db.session.add(user_4)
    db.session.add(user_5)
    db.session.add(user_6)
    db.session.add(user_7)
    db.session.add(user_8)
    db.session.add(user_9)
    db.session.add(user_10)
    db.session.add(user_11)
    db.session.add(user_12)
    db.session.add(user_13)
    db.session.add(user_14)
    db.session.add(user_15)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
