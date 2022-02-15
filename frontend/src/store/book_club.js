// constants
const LOAD_BOOK_CLUBS = 'bookClub/loadBookClubs';
const ADD_BOOK_CLUB = 'bookClub/addBookClub';
const REMOVE_BOOK_CLUB = 'bookClub/removeBookClub';

// action creators
const loadBookClubs = (bookClubs) => {
    return {
        type: LOAD_BOOK_CLUBS,
        bookClubs
    }
};

const addBookClub = (bookClub) => {
    return {
        type: ADD_BOOK_CLUB,
        bookClub
    }
};

const removeBookClub = (bookClubId) => {
    return {
        type: REMOVE_BOOK_CLUB,
        bookClubId
    }
};

// thunks middleware
export const getAllBookClubs = () => async (dispatch) => {
    const res = await fetch('/api/book-clubs');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubs(data['book clubs']));
    }
}

export const getBookClub = (id) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubs(data['book club']));
    }
}

export const updateBookClub = (id, updatedBookClub) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}`, {
        method: 'PATCH',
        body: JSON.stringify(updatedBookClub)
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClub(data['book club']));
    }
}

export const deleteBookClub = (id) => async (dispatch) => {
    const res = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeBookClub(id))
    }
}

// initial state
const initialState = { byId: {}, allIds: [] };

// event reducer
const bookClubReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BOOK_CLUBS:
            newState = { ...state };
            newState.byId = action.bookClubs.reduce((bookClubs, bookClub) => {
                newState.allIds.push(bookClub.id);
                bookClubs[bookClub.id] = bookClub;
                return bookClubs;
            }, {});
            return newState;
        case ADD_BOOK_CLUB:
            newState = { ...state };
            console.log(action)
            newState.byId = { ...state.byId, [action.bookClub.id]: action.bookClub };
            newState.allIds.push(action.bookClub.id);
            return newState;
        case REMOVE_BOOK_CLUB:
            newState = { ...state }
            delete newState.byId[action.bookClubId];
            newState.allIds = newState.allIds.filter(bookClub => bookClub.id !== action.bookClubId);
            return newState;
        default:
            return state;
    }
};

export default bookClubReducer;
