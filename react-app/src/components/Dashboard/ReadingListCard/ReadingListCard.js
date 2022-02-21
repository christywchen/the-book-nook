import { useEffect, useState } from 'react';
import { useHistory, Link, useParams } from 'react-router-dom';
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
    const [showDelete, setShowDelete] = useState(false);

    const backgroundImage = { backgroundImage: `url("${book?.image_url}")` }

    const bookAdder = bookClubBookRecord?.added_by_id;
    const bookClubHost = bookClub?.host_id;

    async function handleSelect(e) {
        e.preventDefault();
        setCurrStatus(e.target.value)
        console.log(bookClubId, book.id, currStatus)
        // const data = await dispatch(updateBookClubBook(bookClubId, book.id, currStatus));
        // console.log(data)

        // console.log(data)
    }

    async function handleRemove(e) {
        e.preventDefault();

        const data = await dispatch(deleteBookClubBook(bookClubId, book.id))
        await dispatch(getBookClubBooks(bookClubId));
    }

    if (!book) {
        return null;
    }

    return (
        <>
            <div>

                <div className='readinglist__card'>
                    <div>
                        <Link to={`/books/${book?.id}`}>
                            <div className='readinglist__card--image' style={backgroundImage}>
                            </div>
                        </Link>
                        <div className='readinglist__card--body'>
                            <div>
                                {book.title && (<div className='readinglist__card--title'>
                                    {book.title.length > 28 ? book.title.slice(0, 28) + '...' : book.title}
                                </div>)}
                                {book.author && (<div className='readinglist__card--author'>
                                    by {book.author.length > 30 ? book.author.slice(0, 30) + '...' : book.author}
                                </div>)}
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <form onChange={handleSelect}> */}
                        <select
                            name='book-club'
                            value={currStatus}
                            onChange={handleSelect}>
                            <option value={'Upcoming'}>Upcoming</option>
                            <option value={'Reading'}>Reading</option>
                            <option value={'Finished'}>Finished</option>
                        </select>
                        {/* </form> */}
                    </div>
                </div >
                {(sessionUser.id === bookAdder || sessionUser.id === bookClubHost) && (
                    <div className='readinglist__card--delete'>
                        <Link to='' onClick={handleRemove}>
                            Remove Book
                        </Link>
                    </div>
                )}
            </div>
        </>
    )
}

export default ReadingListCard;
