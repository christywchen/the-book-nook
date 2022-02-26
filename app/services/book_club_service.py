from datetime import datetime

from app.models import db, BookClub


class BookClubService:
    def create_book_club(data):
        """
        Creates a new book club.
        """
        book_club = BookClub(
            name=data['name'],
            description=data['description'],
            host_id=data['host_id'],
            image_url=data['image_url'],
            capacity=data['capacity'],
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(book_club)
        db.session.commit()

        return book_club


    def get_all_book_clubs():
        """
        Queries for all book clubs.
        """
        all_book_clubs = BookClub.query.all()

        return all_book_clubs


    def get_one_book_club(book_club_id):
        """
        Queries one book club.
        """
        book_club = BookClub.query.get(book_club_id)

        return book_club
