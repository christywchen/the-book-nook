// constants
const LOAD_CHATROOM_MESSAGES = 'chatroomMessage/loadChatroomMessages';
const ADD_CHATROOM_MESSAGE = 'chatroomMessage/addChatroomMessage';
const REMOVE_CHATROOM_MESSAGE = 'chatroomMessage/removeChatroomMessage';

// action creators
const loadChatroomMessages = (chatroomId, chatroomMessages) => {
    return {
        type: LOAD_CHATROOM_MESSAGES,
        chatroomId,
        chatroomMessages
    }
};

const addChatroomMessage = (chatroomId, chatMessage) => {
    return {
        type: ADD_CHATROOM_MESSAGE,
        chatroomId,
        chatMessage
    }
};

const removeChatroomMessage = (chatroomId, chatMessageId) => {
    return {
        type: REMOVE_CHATROOM_MESSAGE,
        chatroomId,
        chatMessageId
    }
}

// thunks
export const getChatroomMessages = (chatroomId) => async (dispatch) => {
    const res = await fetch(`/api/chatrooms/${chatroomId}/messages`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadChatroomMessages(chatroomId, data['chat messages']));
    }
}

export const createChatMessage = (body, userId, chatroomId) => async (dispatch) => {
    const res = await fetch(`/api/chat-messages`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body: body,
            user_id: userId,
            chatroom_id: chatroomId
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addChatroomMessage(data['chat message']));
        return data['chat message'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        const data = {};
        data.errors = ['An error occurred. Please try again.']
        return data;
    }
}

export const updateChatMessage = (chatMessageId, body) => async (dispatch) => {
    const res = await fetch(`/api/chat-messages/${chatMessageId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body: body
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addChatroomMessage(data['chat message']));
        return data['chat message'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteChatMessage = (chatMessageId) => async (dispatch) => {
    const res = await fetch(`/api/chat-messages/${chatMessageId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeChatroomMessage(chatMessageId));
    }
}

// initial state
const initialState = { byChatroomId: {} }

// chatroom message reducer
const chatroomMessageReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_CHATROOM_MESSAGES:
            newState = { ...state };
            newState.byChatroomId[action.chatroomId] = action.chatroomMessages.reduce((chatroomMessages, chatMessage) => {
                chatroomMessages[chatMessage.id] = chatMessage;
                return chatroomMessages;
            }, {});
            return newState;
        case ADD_CHATROOM_MESSAGE:
            newState = { ...state };
            newState.byChatroomId[action.chatroomId] = { ...state.byChatroomId[action.chatroomId], [action.chatMessage.id]: action.chatMessage };
            return newState;
        case REMOVE_BOOK_CLUB_BOOK:
            newState = { ...state }
            delete newState.byChatroomId[action.chatroomId][action.chatMessageId];
            return newState;
        default:
            return state;
    }
}

export default chatroomMessageReducer;
