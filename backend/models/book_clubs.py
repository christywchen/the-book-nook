from .db import db

class BookClub(db.Model):
    __tablename__ = 'book_clubs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.Text)
    host_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    image_url = db.Column(db.Text)
    capacity = db.Column(db.Integer)
    public = db.Column(db.Boolean, nullable=False, default=True)
    created_at = db.Column(db.DateTime, nullable=False)
    updated_at = db.Column(db.DateTime, nullable=False)

    book_club_chatrooms = db.relationship('BookClubChatroom', backref='book_club', cascade='all, delete')
    book_club_members = db.relationship('BookClubMember', backref='book_club', cascade='all, delete')
    book_club_books = db.relationship('BookClubBook', backref='book_club', cascade='all, delete')


    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "host_id": self.host_id,
            "image_url": self.image_url,
            "capacity": self.capacity,
            "public": self.public,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


    def __repr__(self):
        return f"<class 'Book Club', id: {self.id}, name: {self.name}, description: {self.description}, host_id: {self.host_id}, image_url: {self.image_url}, capacity: {self.capacity}, public: {self.public}, created_at: {self.created_at}, updated_at: {self.updated_at}>"
