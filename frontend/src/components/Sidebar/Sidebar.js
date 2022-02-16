import { useEffect, useState } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../Main/Main';

import { getAllBookClubs } from '../../store/book_club';
import { getUserMemberships } from '../../store/book_club_member';

import './Sidebar.css';
import BookClubItem from './BookClubItem/BookClubItem';

function Sidebar() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const userMembershipsObj = useSelector(state => state.bookClubMember.byUserMembershipId);

    useEffect(() => {
        dispatch(getAllBookClubs());
        if (sessionUser) dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch]);

    const bookClubs = Object.values(allBookClubsObj);
    const userMemberships = Object.values(userMembershipsObj);

    let userBookClubs;
    if (userMemberships) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    return (
        <>
            <div id="sidebar__container">
                {userBookClubs && userBookClubs.map(bookClub =>
                    (<BookClubItem bookClub={bookClub} />)
                )}
                {userMemberships.length < 5 && (<Link to='/'>Start Your Own Club</Link>)}
            </div>

            <Switch>
                <Route path='/book-clubs/:bookClubId/rooms/:chatType'>
                    <Main />
                </Route>
            </Switch>
        </>
    )
}

export default Sidebar;
