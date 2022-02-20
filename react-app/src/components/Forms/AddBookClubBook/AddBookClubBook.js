import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookClubs } from '../../../store/book_club';
import { getAllBookClubBooks } from '../../../store/book_club_book';
import { getUserMemberships } from '../../../store/book_club_member';

import './AddBookClubBook.css';

function AddBookClubBook({ book }) {
    const dispatch = useDispatch();
    const [bookClub, setBookClub] = useState();
    const sessionUser = useSelector(state => state.session.id);
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);

    const userMemberships = Object.values(userMembershipsObj);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getAllBookClubBooks());
        if (sessionUser) dispatch(getUserMemberships(sessionUser.id))
    }, [dispatch]);

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

    console.log(bookClubsWithBookObj)
    console.log(bookClubsWithBook)

    let userBookClubs;
    if (userMemberships && allBookClubsObj) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    console.log(userBookClubs)

    return (
        <>
            <div>
                Add to Your Book Club:
                {/* {userBookClubs && userBookClubs.map(bookClub => {
                    if (bookClub.id)
                })} */}
            </div>
            <div>
                Book Clubs Currently Reading This:
                <div id='book__clubs--icon-container'>
                    {bookClubsWithBook.length && allBookClubBooksObj && bookClubsWithBook.map(bookClub => (
                        <div
                            key={bookClub.id}
                            className="book__club--icon-mini"
                            title={bookClub.name}>
                            {bookClub.image_url ? (<img src={bookClub.image_url} className='book__club--icon-img' />) : bookClub.name.slice(0, 1)}

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default AddBookClubBook;
