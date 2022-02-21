import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { getAllBookClubs } from '../../../store/book_club';
import { createBookClubBook, getAllBookClubBooks } from '../../../store/book_club_book';
import { getUserMemberships } from '../../../store/book_club_member';

import './AddBookClubBook.css';

function AddBookClubBook({ book }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
    const [message, setMessage] = useState('')
    const [bookClubId, setBookClubId] = useState('');
    const sessionUser = useSelector(state => state.session.user);
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);

    const userMemberships = Object.values(userMembershipsObj);
    const allBookClubs = Object.values(allBookClubsObj);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getAllBookClubBooks());
        if (sessionUser) dispatch(getUserMemberships(sessionUser.id))
    }, [dispatch, sessionUser]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await dispatch(createBookClubBook(bookClubId, book.id, sessionUser.id))

        if (data.errors) {
            setErrors(data.errors);
            setMessage('');
        } else {
            setMessage('Successfully added. Go to your book club\'s reading list?')
            setErrors([]);
        }
    }

    // get all book clubs that have this book by filtering all book club books and
    // mapping to the book club that is on record for that book club book
    let bookClubsWithBookObj;
    let bookClubsWithBook;
    if (allBookClubBooks && allBookClubsObj) {
        bookClubsWithBook = allBookClubBooks.reduce((bookClubs, bookClubBook) => {
            if (bookClubBook.book_id === book.id) {
                bookClubs.push(allBookClubsObj[bookClubBook.book_club_id]);
            }
            return bookClubs;
        }, []);
    }

    // get all of the book clubs that a user belongs to
    // so they can be shown in the add book club book form
    let userBookClubs;
    if (userMemberships && allBookClubsObj) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    return (
        <>
            <div>
                {userMemberships.length > 0 && allBookClubs.length && (
                    <>
                        <hr className='book__details--divider' />
                        <div className='book__details--mini-title'>
                            Recommend this to Your Book Club:
                        </div>
                        <form className='form__add--book-to-club' onSubmit={handleSubmit}>
                            <div>
                                <select
                                    name='book-club'
                                    value={bookClubId}
                                    onChange={(e) => setBookClubId(e.target.value)}>
                                    <option value=''>Select</option>
                                    {userBookClubs.length && allBookClubs.length && userBookClubs.map(bookClub => (
                                        <option key={bookClub.id} value={bookClub.id}>{bookClub.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='form__buttons'>
                                <button
                                    disabled={!bookClubId}
                                    className='button' type='submit'>Add</button>
                            </div>
                        </form>
                        {errors.length > 0 && (
                            <ul className='form__add--book-to-club--errors'>{
                                errors.map((error, ind) => (
                                    <li key={ind}>{error}</li>
                                ))
                            }
                            </ul>
                        )}
                        {message && (
                            <Link className='form__add--book-to-club--message' to={`/dashboard/book-clubs/${bookClubId}/reading-list`}>{message}</Link>
                        )}
                    </>
                )}
                <div>
                    {bookClubsWithBook.length > 0 && allBookClubs.length && (
                        <>
                            <hr className='book__details--divider' />
                            <div className='book__details--mini-title'>
                                Book Clubs Currently Reading This:
                            </div>
                            <div className='book__details--mini-container book__details--clubs-container'>
                                {bookClubsWithBook.map(bookClub => (
                                    <div
                                        key={bookClub.id}
                                        className="book__club--icon-mini"
                                        title={bookClub.name}>
                                        {bookClub.image_url ? (<img src={bookClub.image_url} alt='' className='book__club--icon-img' />) : bookClub.name.slice(0, 1)}
                                    </div>))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default AddBookClubBook;
