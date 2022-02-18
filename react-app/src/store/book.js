// constants
const LOAD_BOOKS = 'book/loadBooks';
const ADD_BOOK = 'book/addBook';
const REMOVE_BOOK = 'book/removeBook';

// action creators
const loadBooks = (books) => {
    return {
        type: LOAD_BOOKS,
        books
    }
}

const addBook = (book) => {
    return {
        type: ADD_BOOK,
        book
    }
}

const removeBook = (bookId) => {
    return {
        type: REMOVE_BOOK,
        bookId
    }
}

// thunk middlewares
export const createBook = (title, author, description, imageUrl, isbn, isbn13, originalTitle, language, publicationYear, pages) => async (dispatch) => {
    const res = await fetch('/api/books', {
        method: 'POST',
        heads: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            author: author,
            description: description,
            image_url: imageUrl,
            isbn: isbn,
            isbn13: isbn13,
            original_title: originalTitle,
            language: language,
            publication_year: publicationYear,
            pages: pages
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatchEvent(addBook(data['book']));
        return data['book'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const getAllBooks = () => async (dispatch) => {
    const res = await fetch('/api/books');

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBooks(data['books']));
    }
}

export const getBook = (id) => async (dispatch) => {
    const res = await fetch(`/api/books/${id}`);

    if (res.ok) {
        const data = await res.json();
        dispatch(loadBooks(data['book']));
    }
}

export const updateBook = (id, title, author, description, imageUrl, isbn, isbn13, originalTitle, language, publicationYear, pages) => async (dispatch) => {
    const res = await fetch(`/api/books/${id}`, {
        method: 'PATCH',
        heads: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            author: author,
            description: description,
            image_url: imageUrl,
            isbn: isbn,
            isbn13: isbn13,
            original_title: originalTitle,
            language: language,
            publication_year: publicationYear,
            pages: pages
        }),
    });

    if (res.ok) {
        const data = await res.json();
        dispatchEvent(addBook(data['book']));
        return data['book'];
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        } else {
            return ['An error occured. Please try again.']
        }
    }
}

export const deleteBook = (id) => async (dispatch) => {
    const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        dispatch(removeBook(id));
    }
}

// initial state
const initialState = { byId: {}, allIds: [] };

// book reducer
const bookReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {
        case LOAD_BOOKS:
            newState = { ...state };
            newState.byId = action.books.reduce((books, book) => {
                newState.allIds.push(book.id);
                books[book.id] = book;
            }, {});
            return newState;
        case ADD_BOOK:
            newState = { ...state };
            newState.byId = { ...state.byId, [action.book.id]: action.book };
            newState.allIds.push(action.book.id);
            return newState;
        case REMOVE_BOOK:
            newState = { ...state };
            delete newState.byId[action.bookId];
            newState.allIds = newState.allIds.filter(book => book.id != action.bookId);
            return newState;
        default:
            return state;
    }
};

export default bookReducer;
