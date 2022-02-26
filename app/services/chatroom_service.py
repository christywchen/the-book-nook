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


    def get_all_chatrooms():
        """
        Queries for all chatrooms in the database.
        """
        all_chatrooms = BookClubChatroom.query.all()

        return all_chatrooms


    def get_one_chatroom(chatroom_id):
        """
        Queries for one chatroom.
        """
        chatroom = BookClubChatroom.query.get(chatroom_id)

        return chatroom


    def get_chatrooms_by_club(book_club_id):
        """
        Queries for all of a book club's chatrooms.
        """
        chatrooms = BookClubChatroom.query.filter(BookClubChatroom.book_club_id == book_club_id).all()

        return chatrooms
