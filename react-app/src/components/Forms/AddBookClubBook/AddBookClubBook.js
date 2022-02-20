import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBookClubs } from '../../../store/book_club';
import { createBookClubBook, getAllBookClubBooks } from '../../../store/book_club_book';
import { getUserMemberships } from '../../../store/book_club_member';

import './AddBookClubBook.css';

function AddBookClubBook({ book }) {
    const dispatch = useDispatch();
    const [errors, setErrors] = useState([]);
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
    }, [dispatch]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await dispatch(createBookClubBook(bookClubId, book.id, sessionUser.id))

        if (data.errors) {
            setErrors(data.errors);
        } else {
            const bookClubBook = data;
            setErrors([]);
        }
        // console.log(bookClubId)
    }

    let bookClubsWithBookObj;
    let bookClubsWithBook;
    if (allBookClubBooks && allBookClubsObj) {
        bookClubsWithBookObj = allBookClubBooks.reduce((bookClubs, bookClubBook) => {
            if (bookClubBook.book_id === book.id) {
                bookClubs[bookClubBook.book_club_id] = allBookClubsObj[bookClubBook.book_club_id];
            }
            return bookClubs;
        }, {});

        bookClubsWithBook = Object.values(bookClubsWithBookObj)
    }

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
                        Add to Your Book Club:
                        <form onSubmit={handleSubmit}>
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
                                    className='button' type='submit'>Submit</button>
                            </div>
                            {errors.length > 0 && (
                                <ul className='auth__container--errors'>{
                                    errors.map((error, ind) => (
                                        <li key={ind}>{error}</li>
                                    ))
                                }
                                </ul>
                            )}
                        </form>
                    </>
                )}
                <div>
                    <div id='book__clubs--icon-container'>
                        {bookClubsWithBook.length > 0 && allBookClubs.length && (
                            <>
                                Book Clubs Currently Reading This:
                                {bookClubsWithBook.map(bookClub => (
                                    <div
                                        key={bookClub.id}
                                        className="book__club--icon-mini"
                                        title={bookClub.name}>
                                        {bookClub.image_url ? (<img src={bookClub.image_url} className='book__club--icon-img' />) : bookClub.name.slice(0, 1)}
                                    </div>))}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddBookClubBook;
