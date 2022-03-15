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

// thunks
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

export const createBookClub = (name, description, hostId, imageUrl, imageName, capacity) => async (dispatch) => {
    const res = await fetch('/api/book-clubs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            host_id: hostId,
            image_url: imageUrl,
            image_name: imageName,
            capacity: capacity
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClub(data['book club']));
        return data['book club'];
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

export const updateBookClub = (id, name, description, hostId, imageUrl, imageName, capacity) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: name,
            description: description,
            host_id: hostId,
            image_url: imageUrl,
            image_name: imageName,
            capacity: capacity
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClub(data['book club']));
        return data['book club'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteBookClub = (id) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeBookClub(id));
    }
}

// initial state
const initialState = { byId: {}, allIds: [] };

// book club reducer
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
