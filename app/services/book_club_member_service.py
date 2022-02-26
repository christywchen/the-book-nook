from datetime import datetime

from app.models import db, BookClubMember


class BookClubMemberService:
    def create_membership(book_club_id, user_id):
        """
        Create new book club membership.
        """
        membership = BookClubMember(
            book_club_id=book_club_id,
            user_id=user_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(membership)
        db.session.commit()
