import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getUserMemberships } from '../../store/book_club_member';

import JoinedClubs from './JoinedClubs/JoinedClubs';
import BrowseClubs from './BrowseClubs/BrowseClubs';
import CreateClub from './CreateClub/CreateClub';

import { getAllBookClubs } from '../../store/book_club';

import './Sidebar.css';

function Sidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const userMembershipsObj = useSelector(state => state.bookClubMember.byUserMembershipId);
    const userMemberships = Object.values(userMembershipsObj);

    useEffect(() => {
        if (sessionUser) {
            console.log(sessionUser, 'sidebar sessionuser')
            dispatch(getUserMemberships(sessionUser.id));
        }
    }, [dispatch]);

    const isDashboard = location.pathname.startsWith('/dashboard');
    const isBookClubList = location.pathname.startsWith('/book-clubs/all');
    const isBookClubCreate = location.pathname.startsWith('/book-clubs/new');

    return (
        <>
            <div id="sidebar__container">
                {isDashboard && <JoinedClubs userMemberships={userMemberships} />}
                {isBookClubList && <BrowseClubs userMemberships={userMemberships} />}
                {isBookClubCreate && <CreateClub userMemberships={userMemberships} />}
            </div>
        </>
    )
}

export default Sidebar;
