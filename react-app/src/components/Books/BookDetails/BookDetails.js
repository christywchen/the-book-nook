import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { getBook } from '../../../store/book';

import './BookDetails.css';

function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const book = useSelector(state => state.book.byId[id]);

    const backgroundImage = { backgroundImage: `url("${book?.image_url}")` }

    useEffect(() => {
        dispatch(getBook(id));
    }, [dispatch])

    if (!book) {
        return (
            <>This book does not exist.</>
        )
    }

    async function handleEditBook(e) {
        e.preventDefault();

        return history.push(`/books/${id}/edit`)
    }

    return (
        <>
            <div id='wide__container'>
                <div className='book__details--container'>
                    <div className='book__details--image-container'>
                        <div className='book__details--image' style={backgroundImage}>
                        </div>

                        <div className='create__club--link'>
                            <form onSubmit={handleEditBook}>
                                <button className='button button__sidebar--center' type='submit'>Edit Book</button>
                            </form>
                        </div>
                    </div>
                    <div className='book__details--text-container'>
                        {/* <span id='wide__title'>The Diving Bell and the Butterfly</span> */}
                        <div className='book__details--title'>
                            {book.title}
                        </div>
                        {book.original_title && (
                            <div>Original Title: {book.original_title}</div>
                        )}
                        <div>
                            by {book.author}
                        </div>
                        {book.synopsis && (
                            <div className='book__details--synopsis'>
                                {book.synopsis}
                            </div>
                        )}
                        <div>
                            {book.language}
                            {book.pages && (
                                <>, {book.pages} Pages</>)}
                        </div>
                        {book.publication_year && (
                            <div>
                                Publication Year: {book.publication_year}
                            </div>
                        )}
                        {book.isbn13 && (
                            <div>
                                ISBN13: {book.isbn13}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookDetails;
