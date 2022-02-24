import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './ReadingListCard.css';
import { deleteBookClubBook, getBookClubBooks, updateBookClubBook } from '../../../store/book_club_book';

function ReadingListCard({ bookInfo }) {
    const [book, bookClubBookRecord] = bookInfo;
    const { bookClubId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const bookClub = useSelector(state => state.bookClub.byId[bookClubId]);

    const [currStatus, setCurrStatus] = useState(bookClubBookRecord.status || '');

    const backgroundImage = { backgroundImage: `url("${book?.image_url}")` };

    let shortCard;
    if (!bookClubId) {
        shortCard = { height: '267px' };
    }

    const bookAdder = bookClubBookRecord?.added_by_id;
    const bookClubHost = bookClub?.host_id;

    async function handleSelect(e) {
        e.preventDefault();
        setCurrStatus(e.target.value)
        await dispatch(updateBookClubBook(bookClubId, book.id, e.target.value));
    }

    async function handleRemove(e) {
        e.preventDefault();
        await dispatch(deleteBookClubBook(bookClubId, book.id))
        await dispatch(getBookClubBooks(bookClubId));
    }

    if (!book) {
        return null;
    }

    return (
        <>
            <div className='readinglist__card' style={shortCard}>
                <div>
                    <Link to={`/books/${book?.id}`}>
                        <div className='readinglist__card--image' style={backgroundImage}>
                            {!book?.image_url && <>No Cover Image Available</>}
                        </div>
                    </Link>
                    <div className='readinglist__card--body'>
                        <div>
                            {book.title && (<div className='readinglist__card--title'>
                                {book.title.length > 28 ? book.title.slice(0, 23) + '...' : book.title}
                            </div>)}
                            {book.author && (<div className='readinglist__card--author'>
                                by {book.author.length > 30 ? book.author.slice(0, 30) + '...' : book.author}
                            </div>)}
                        </div>
                    </div>
                </div>
                {bookClubId && (<div>
                    <select
                        name='book-club'
                        value={currStatus}
                        onChange={handleSelect}>
                        <option value={1}>Upcoming</option>
                        <option value={2}>Reading</option>
                        <option value={3}>Finished</option>
                    </select>
                </div>)}
            </div >
            {bookClubId && (sessionUser.id === bookAdder || sessionUser.id === bookClubHost) && (
                <div className='readinglist__card--delete'>
                    <Link to='' onClick={handleRemove}>
                        Remove Book
                    </Link>
                </div>
            )}
        </>
    )
}

export default ReadingListCard;
