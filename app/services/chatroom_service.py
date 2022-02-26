from datetime import datetime

from app.models import db, BookClubChatroom


class ChatroomService:
    """
    Services the Book Club Chatroom model.
    """

    def create_chatroom(chatroom_name, book_club_id):
        """
        Creates a new chatroom.
        """
        chatroom = BookClubChatroom(
            name=chatroom_name,
            book_club_id=book_club_id,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )

        db.session.add(chatroom)
        db.session.commit()

        return chatroom
