from backend.models import db, Book
from datetime import datetime

def seed_books():
    book_1 = Book(
        title='The Diving Bell and the Butterfly',
        author='Jean-Dominique Bauby',
        original_title='Le Scaphandre et le Papillon',
        language='English',
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_2 = Book(
        title='White Oleander',
        author='Janet Fitch',
        language='English',
        publication_year=2001,
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_3 = Book(
        title='House of Leaves',
        author=' Mark Z. Danielewski',
        language='English',
        created_at=datetime.now(),
        updated_at=datetime.now())
    book_4 = Book(
        title='The Principles of Uncertainty',
        author='Maira Kalman',
        language='English',
        created_at=datetime.now(),
        updated_at=datetime.now())

    db.session.add(book_1)
    db.session.add(book_2)
    db.session.add(book_3)
    db.session.add(book_4)

    db.session.commit()


def undo_books():
    db.session.execute('TRUNCATE books RESTART IDENTITY CASCADE;')
    db.session.commit()
