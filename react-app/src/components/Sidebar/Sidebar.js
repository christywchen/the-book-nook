import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserMemberships } from '../../store/book_club_member';

import JoinedClubs from './Dashboard/JoinedClubs/JoinedClubs';
import BrowseClubs from './BookClubs/BrowseClubs/BrowseClubs';
import CreateClub from './BookClubs/CreateClub/CreateClub';
import EditClub from './BookClubs/EditClub/EditClub';
import BrowseBooks from './Books/BrowseBooks/BrowseBooks';
import CreateBook from './Books/CreateBook/CreateBook';
import EditBook from './Books/EditBook/EditBook';

import './Sidebar.css';
import BookDetails from './Books/BookDetails/BookDetails';

function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const userMemberships = Object.values(userMembershipsObj);

    useEffect(() => {
        if (sessionUser) {
            dispatch(getUserMemberships(sessionUser.id));
        }
    }, [dispatch, sessionUser]);

    const isDashboard = location.pathname.startsWith('/dashboard');
    const isBookClubList = location.pathname.match(/\/book-clubs\/all$/);
    const isBookClubCreate = location.pathname.match(/\/book-clubs\/new$/);
    const isBookClubEdit = location.pathname.match(/\/book-clubs\/\d+\/edit$/)

    const isBookList = location.pathname.match(/\/books\/all$/);
    const isBookCreate = location.pathname.match(/\/books\/new$/);
    const isBookEdit = location.pathname.match(/\/books\/\d+\/edit$/);
    const isBookDetails = location.pathname.match(/\/books\/\d+$/)

    return (
        <>
            <div id="sidebar__container">
                {isDashboard && <JoinedClubs userMemberships={userMemberships} />}
                {isBookClubList && <BrowseClubs userMemberships={userMemberships} />}
                {isBookClubCreate && <CreateClub userMemberships={userMemberships} />}
                {isBookClubEdit && <EditClub userMemberships={userMemberships} />}
                {isBookList && <BrowseBooks />}
                {isBookCreate && <CreateBook />}
                {isBookEdit && <EditBook />}
                {isBookDetails && <BookDetails />}
            </div>
        </>
    )
}

export default Sidebar;
