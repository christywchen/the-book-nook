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

import { getAllBookClubs } from '../../store/book_club';

import './Sidebar.css';

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
    }, [dispatch]);

    const isDashboard = location.pathname.startsWith('/dashboard');
    const isBookClubList = location.pathname.startsWith('/book-clubs/all');
    const isBookClubCreate = location.pathname.startsWith('/book-clubs/new');
    const isBookClubEdit = location.pathname.startsWith('/book-clubs') && location.pathname.endsWith('/edit');
    const isBookList = location.pathname.startsWith('/books/all');
    const isBookCreate = location.pathname.startsWith('/books/new');

    return (
        <>
            <div id="sidebar__container">
                {isDashboard && <JoinedClubs userMemberships={userMemberships} />}
                {isBookClubList && <BrowseClubs userMemberships={userMemberships} />}
                {isBookClubCreate && <CreateClub userMemberships={userMemberships} />}
                {isBookClubEdit && <EditClub userMemberships={userMemberships} />}
                {isBookList && <BrowseBooks />}
                {isBookCreate && <CreateBook />}
            </div>
        </>
    )
}

export default Sidebar;
