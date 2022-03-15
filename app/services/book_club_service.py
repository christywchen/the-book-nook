from datetime import datetime

from app.models import db, BookClub


class BookClubService:
    """
    Services the Book Club model.
    """

    def create_book_club(data):
        """
        Creates a new book club.
        """
        book_club = BookClub(
            name=data['name'],
            description=data['description'],
            host_id=data['host_id'],
            image_url=data['image_url'],
            image_name=data['image_name'],
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


    def update_book_club(book_club, data):
        """
        Updates a book club record.
        """
        book_club.name = data['name']
        book_club.description = data['description']
        book_club.host_id = data['host_id']
        book_club.image_url = data['image_url']
        book_club.image_name = data['image_name']
        book_club.capacity = data['capacity']
        book_club.updated_at = datetime.now()

        db.session.commit()

        return book_club


    def delete_book_club(book_club_id):
        """
        Deletes a book club by book club id.
        """
        book_club = BookClub.query.get(book_club_id)

        db.session.delete(book_club)
        db.session.commit()

        return book_club_id
