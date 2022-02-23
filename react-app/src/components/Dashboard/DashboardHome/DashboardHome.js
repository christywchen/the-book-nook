import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '../../../store/book';
import { getAllBookClubs } from '../../../store/book_club';
import { getAllBookClubBooks } from '../../../store/book_club_book';
import DashboardCard from '../DashboardCard/DashboardCard';

function DashboardHome() {
    const dispatch = useDispatch();
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBooksObj = useSelector(state => state.book.byId);

    const userMemberships = Object.values(userMembershipsObj);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getAllBookClubBooks());
        dispatch(getAllBooks());
    }, [dispatch]);

    // get a user's book clubs
    let userBookClubs;
    if (userMemberships && allBookClubsObj) {
        userBookClubs = userMemberships.map(userMembership => {
            return allBookClubsObj[userMembership.book_club_id];
        });
    }

    if (!userBookClubs || !allBooksObj || !allBookClubBooks) {
        return (
            <section id="center__container">
                <div id='center__container--title'>My Book Clubs</div>
                <div className='center__card--container'>
                    Try joining a book club to what your book clubs are currently reading.
                </div>
            </section>
        )
    }

    return (
        <>
            <section id="center__container">
                <div id='center__container--topbar'>
                    <div className="circular__icon dashboard__icon">
                        R
                    </div>
                    <div id='center__container--title'>
                        Reading List
                    </div>
                </div>
                <div id='center__container--main-content'>
                    Here's what's on the docket for your book clubs...
                    <div className='readinglist__card--container'>
                        {userBookClubs.length > 0 ? userBookClubs.map(bookClub => (
                            <DashboardCard bookClub={bookClub} allBooksObj={allBooksObj} allBookClubBooks={allBookClubBooks} />
                        )) : (<>You need to join a book club to get access to their reading list.</>)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardHome;
