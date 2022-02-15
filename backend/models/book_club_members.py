from .db import db
from sqlalchemy import UniqueConstraint

class BookClubMember(db.Model):
    __tablename__ = 'book_club_members'
    __table_args__ = (
        UniqueConstraint('book_club_id', 'user_id', name='book_club_member'),
    )

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    book_club_id = db.Column('book_club_id', db.Integer, db.ForeignKey('book_clubs.id'), primary_key=True)
    user_id = db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True)
    status = db.Column('status', db.Integer, nullable=False, default=1)
    created_at = db.Column('created_at', db.DateTime, nullable=False)
    updated_at = db.Column('updated_at', db.DateTime, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "book_club_id": self.book_club_id,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
