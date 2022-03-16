import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '../../../store/book';
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
        }).sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
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
            <section id="center__container" className='dashboardhome--readinglist'>
                <div id='center__container--topbar'>
                    <div className="circular__icon dashboard__icon">
                        B
                    </div>
                    <div id='center__container--title'>
                        Book Club Reading Lists
                    </div>
                    <div id='center__container--subtitle'>
                        Your book clubs at a glance.
                    </div>
                </div>
                <div id='center__container--main-content'>
                    <div className='readinglist__card--container'>
                        {userBookClubs.length > 0 ? userBookClubs.map((bookClub, ind) => (
                            <DashboardCard key={ind} bookClub={bookClub} allBooksObj={allBooksObj} allBookClubBooks={allBookClubBooks} />
                        )) : (<>You need to join a book club to get access to their reading list.</>)}
                    </div>
                </div>
            </section>
        </>
    )
}

export default DashboardHome;
