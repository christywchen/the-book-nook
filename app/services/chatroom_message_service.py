from app.models import ChatroomMessage


class ChatroomMessageService:
    """
    Services the Chatroom Message model.
    """

    def get_messages_by_chatroom(chatroom_id):
        chatroom_messages = ChatroomMessage.query.filter(ChatroomMessage.chatroom_id == chatroom_id).all()

        return chatroom_messages
