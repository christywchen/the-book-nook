import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '../../store/book';

import BookCard from '../Books/BookCard/BookCard';

// import './BookList.css';

function Results() {
    const dispatch = useDispatch();
    const booksObj = useSelector(state => state.book.byId);
    const books = Object.values(booksObj).sort((a, b) => {
        const x = a.title.toLowerCase();
        const y = b.title.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });

    useEffect(() => {
        dispatch(getAllBooks());
    }, [dispatch]);

    return (
        <section id='wide__container'>
            <div id='wide__subcontainer--centered'>
                <div id='wide__title'>Explore Books</div>
                <div className='book__card--container'>
                    {books.length ? (
                        <>
                            {books.length > 0 && books.map(book => (<BookCard key={book.id} book={book} />))}
                        </>
                    ) : (<>No books at the moment. Maybe you could help us expand our library?</>)}
                </div>
            </div>
        </section>
    )
}

export default Results;
