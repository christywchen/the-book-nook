import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAllBooks } from '../../../store/book';

import BookCard from '../BookCard/BookCard';

import './BookList.css';

function BookList() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.book.byId);
    const books = Object.values(booksObj);

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    return (
        <div id='wide__container'>
            <div id='wide__title'>Explore Books</div>
            <div className='book__card--container'>
                {books.length > 0 && books.map(book => (<BookCard book={book} />))}
            </div>
        </div>
    )
}

export default BookList;
