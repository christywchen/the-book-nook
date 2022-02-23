import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBooks } from '../../../store/book';
import { getAllBookClubs } from '../../../store/book_club';
import { getAllBookClubBooks } from '../../../store/book_club_book';

function DashboardHome() {
    const dispatch = useDispatch();
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId)
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    const userMemberships = Object.values(userMembershipsObj);

    useEffect(() => {
        dispatch(getAllBookClubBooks());
        dispatch(getAllBooks());
    }, [dispatch]);

    // get a user's book clubs
    // get book club books for the book club
    // get the book object in order to return details about the book
    if (userMemberships && allBookClubBooksObj) {

    }

    return (
        <>
            SOMETHING
        </>
    )
}

export default DashboardHome;
