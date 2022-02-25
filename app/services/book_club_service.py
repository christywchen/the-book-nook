from app.models import db, BookClub

class BookClubService():
    def create_book_club(data):
        """
        Creates a new book club.
        """



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
