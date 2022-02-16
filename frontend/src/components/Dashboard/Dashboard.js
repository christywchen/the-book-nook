import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Chatroom from './Chatroom/Chatroom';
import Sidebar from "./Sidebar/Sidebar";
import DetailsBar from "./DetailsBar/DetailsBar";

import { getAllBookClubs } from '../../store/book_club';
import { getUserMemberships } from '../../store/book_club_member';

import './Dashboard.css';

function Dashboard() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const userMembershipsObj = useSelector(state => state.bookClubMember.byUserMembershipId);

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch, sessionUser.id]);

    function getUserBookClubs(userId) {
        // loop through user's memberships and return the book club object corresponding to that membership
        const userMemberships = Object.values(userMembershipsObj);

        return userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    let userBookClubs;
    if (userMembershipsObj) {
        userBookClubs = getUserBookClubs(sessionUser.id);
    }

    let bookClubs;
    if (allBookClubsObj) {
        bookClubs = Object.values(allBookClubsObj);
    }

    return (
        <>
            <div id="dashboard__container">
                <div>
                    <Sidebar userBookClubs={userBookClubs} />
                </div>

                <Switch>
                    <Route path='/dashboard/clubs/:bookClubId/:chatType'>
                        <Chatroom />
                        <DetailsBar bookClubs={bookClubs} />
                    </Route>
                </Switch>

            </div>
        </>
    )
}

export default Dashboard;
