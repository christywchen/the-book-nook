import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getAllBooks, searchBooks } from '../../store/book';
import { getURLParams } from '../../utils';

import BookCard from '../Books/BookCard/BookCard';

import './Results.css';

function Results() {
    const location = useLocation();
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.book.byId);
    const books = Object.values(booksObj).sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });
    const [searchParams, paramsStr] = getURLParams(location.search);

    useEffect(() => {
        dispatch(searchBooks(paramsStr));
    }, [dispatch, paramsStr]);

    return (
        <section id='wide__container'>
            <div id='wide__subcontainer--centered'>
                <div id='wide__title'>Search Results</div>
                <div className='results__message'>{searchParams}</div>
                <div className='book__card--container'>
                    {books.length ? (
                        <>
                            {books.length > 0 && books.map(book => (<BookCard key={book.id} book={book} />))}
                        </>
                    ) : (<>We couldn't find a book that matches your search. Maybe you could help us expand our library?</>)}
                </div>
            </div>
        </section>
    )
}

export default Results;
