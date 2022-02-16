import { useEffect } from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../Main/Main';

import { getAllBookClubs } from '../../store/book_club';
import { getUserMemberships } from '../../store/book_club_member';

import './Sidebar.css';

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
                {userBookClubs && userBookClubs.map(bookClub => {
                    if (bookClub.id) {
                        return (<>
                            <div key={bookClub.id}>
                                <div className="sidebar__title">
                                    {bookClub.name}
                                    {/* <div className="sidebar_caret"> */}
                                    {/* </div> */}
                                </div>
                                <i class="fa-solid fa-angle-down"></i>
                                <p>
                                    <Link to={`/book-clubs/${bookClub.id}/rooms/general`}>
                                        General Chat
                                    </Link>
                                </p>
                                <p>
                                    <Link to={`/book-clubs/${bookClub.id}/rooms/spoilers`}>
                                        Spoilers Chat
                                    </Link>
                                </p>
                            </div>
                        </>
                        )
                    }
                })
                }
                <Link to='/'>Start Your Own Club</Link>
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
