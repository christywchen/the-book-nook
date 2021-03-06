import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { getBook } from '../../../store/book';
import AddBookClubBook from '../../Forms/AddBookClubBook/AddBookClubBook';

import './BookDetails.css';

function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const book = useSelector(state => state.book.byId[id]);

    const backgroundImage = { backgroundImage: `url("${book?.image_url}")` }

    useEffect(() => {
        dispatch(getBook(id));
    }, [dispatch, id])

    if (!book) {
        return (
            <section id='wide__container'>
                <div id='wide__subcontainer--centered'>
                    <div id='wide__title'>Not Found</div>
                    <div className='book__card--container'>
                        This book does not exist.
                    </div>
                </div>
            </section >
        )
    }

    async function handleEditBook(e) {
        e.preventDefault();

        return history.push(`/books/${id}/edit`)
    }

    return (
        <>
            <section id='wide__container'>
                <div id='wide__subcontainer--centered'>
                    <div id='wide__title'>{book.title}</div>
                    <div id='wide__subtitle'>by {book.author}</div>
                    <div className='book__details--container'>
                        <div className='book__details--image-container'>
                            <div className='book__details--image' style={backgroundImage}>
                                {!book.image_url && <>No Cover Image Available</>}
                            </div>

                            <div className='sidebar__cta--link'>
                                <form onSubmit={handleEditBook}>
                                    <button className='button button__main--center' type='submit'>Edit Book</button>
                                </form>
                            </div>
                        </div>
                        <div className='book__details--text-container'>
                            {book.synopsis && (
                                <>
                                    <div className='weight__med book__details--synopsis-title'>
                                        Synopsis
                                    </div>
                                    <div className='book__details--synopsis'>
                                        {book.synopsis.replace(/\n+/g, '\n\n')}
                                    </div>
                                </>
                            )}
                            {book.original_title && (
                                <div className='book__details--text-small'>
                                    <span className='weight__med'>Original Title:</span>  {book.original_title}
                                </div>
                            )}
                            {book.pages && (
                                <div className='book__details--text-small'>
                                    {book.pages} Pages
                                </div>
                            )}
                            <div className='book__details--text-small'>
                                <span className='weight__med'>Language:</span>  {book.language}
                            </div>
                            {book.publication_year && (
                                <div className='book__details--text-small'>
                                    <span className='weight__med'>Publication Year:</span> {book.publication_year}
                                </div>
                            )}
                            {book.isbn13 && (
                                <div className='book__details--text-small'>
                                    <span className='weight__med'>ISBN13:</span> {book.isbn13}
                                </div>
                            )}

                            <AddBookClubBook book={book} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookDetails;
