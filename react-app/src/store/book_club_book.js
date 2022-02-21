// constants
const LOAD_BOOK_CLUB_BOOKS = 'bookClubBook/loadBookClubBooks';
const ADD_BOOK_CLUB_BOOK = 'bookClubBook/addBookClubBook';
const REMOVE_BOOK_CLUB_BOOK = 'bookClubBook/removeBookClubBook';

// action creators
const loadBookClubBooks = (bookClubBooks) => {
    return {
        type: LOAD_BOOK_CLUB_BOOKS,
        bookClubBooks
    }
};

const addBookClubBook = (bookClubBook) => {
    return {
        type: ADD_BOOK_CLUB_BOOK,
        bookClubBook
    }
};

const removeBookClubBook = (bookClubBookId) => {
    return {
        type: REMOVE_BOOK_CLUB_BOOK,
        bookClubBookId
    }
}

// thunk middlewares
export const getAllBookClubBooks = () => async (dispatch) => {
    const res = await fetch('/api/book-club-books');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubBooks(data['book club books']));
    }
}

export const getBookClubBooks = (bookClubId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${bookClubId}/books`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBookClubBooks(data['book club books']));
    }
}

export const createBookClubBook = (bookClubId, bookId, userId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${bookClubId}/books/${bookId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            book_id: bookId,
            book_club_id: bookClubId,
            added_by_id: userId
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClubBook(data['book club book']));
        return data['book club book'];
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

export const updateBookClubBook = (bookClubId, bookId, status) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${bookClubId}/books/${bookId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            status: status
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addBookClubBook(data['book club book']));
        return data['book club book'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        }
    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteBookClubBook = (bookClubId, bookId) => async (dispatch) => {
    const res = await fetch(`/api/book-clubs/${bookClubId}/books/${bookId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeBookClubBook(data['book club book id']));
    }
}

// initial state
const initialState = { byId: {} }

// book club book reducer
const bookClubBookReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BOOK_CLUB_BOOKS:
            newState = { ...state };
            newState.byId = action.bookClubBooks.reduce((bookClubBooks, bookClubBook) => {
                bookClubBooks[bookClubBook.id] = bookClubBook;
                return bookClubBooks;
            }, {});
            return newState;
        case ADD_BOOK_CLUB_BOOK:
            newState = { ...state };
            newState.byId = { ...state.byId, [action.bookClubBook.id]: action.bookClubBook };
            return newState;
        case REMOVE_BOOK_CLUB_BOOK:
            newState = { ...state }
            delete newState.byId[action.bookClubBookId];
            return newState;
        default:
            return state;
    }
}

export default bookClubBookReducer;
