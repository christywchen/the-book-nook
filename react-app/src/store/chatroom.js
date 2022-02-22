// constants
const LOAD_BOOK_CLUB_CHATROOMS = 'chatroom/loadBookClubChatrooms';

// action creators
const loadBookClubChatrooms = (bookClubChatrooms) => {
    return {
        type: LOAD_BOOK_CLUB_CHATROOMS,
        bookClubChatrooms
    }
}

// thunks
export const getAllBookClubChatrooms = () => async (dispatch) => {
    const res = await fetch('/api/chatrooms');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubChatrooms(data['chatrooms']));
    }
}

export const getBookClubChatrooms = (bookClubId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${bookClubId}/chatrooms`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubChatrooms(data['chatrooms']));
    }
}

// initial state
const initialState = { byId: {} }

// book club chatroom reducer
const bookClubChatroomReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BOOK_CLUB_CHATROOMS:
            newState = { ...state }
            newState.byId = action.bookClubChatrooms.reduce((bookClubChatrooms, bookClubChatroom) => {
                bookClubChatrooms[bookClubChatroom.id] = bookClubChatroom;
                return bookClubChatrooms;
            }, {});
            return newState;
        default:
            return state;
    }
}

export default bookClubChatroomReducer;
