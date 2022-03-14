from datetime import datetime

from app.models import db, BookClubMember


class BookClubMemberService:
    """
    Services the Book Club Member model.
    """

    def create_membership(book_club_id, user_id):
        """
        Creates a new membership for a book club.
        """
        membership = BookClubMember(
            book_club_id=book_club_id,
            user_id=user_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(membership)
        db.session.commit()

        return membership

    def get_memberships_by_club(book_club_id):
        """
        Queries memberships by book club id.
        """
        memberships = BookClubMember.query.filter(BookClubMember.book_club_id == book_club_id).all()

        return memberships


    def get_user_book_clubs(user_id):
        """
        Query for a user's book club memberships.
        """
        memberships = BookClubMember.query.filter(BookClubMember.user_id == user_id).all()

        return memberships


    def delete_membership(book_club_id, user_id):
        """
        Deletes a book club membership and returns the membership id.
        """
        book_club_member = BookClubMember.query.filter(BookClubMember.book_club_id == book_club_id, BookClubMember.user_id == user_id).first()
        membership_id = book_club_member.id

        db.session.delete(book_club_member)
        db.session.commit()

        return membership_id
