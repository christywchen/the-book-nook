import { useEffect, useState } from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Main from '../Main/Main';

import { getAllBookClubs } from '../../store/book_club';
import { getUserMemberships } from '../../store/book_club_member';

import './Sidebar.css';
import BookClubItem from './BookClubItem/BookClubItem';

function Sidebar() {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const userMembershipsObj = useSelector(state => state.bookClubMember.byUserMembershipId);

    useEffect(() => {
        dispatch(getAllBookClubs());
        if (sessionUser) dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch]);

    async function handleCreateClub(e) {
        e.preventDefault();

        return history.push('/book-clubs/new');
    }

    const bookClubs = Object.values(allBookClubsObj);
    const userMemberships = Object.values(userMembershipsObj);

    let userBookClubs;
    if (userMemberships) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    const isDashboard = location.pathname.startsWith('/dashboard');
    const isBookClubList = location.pathname.startsWith('/book-clubs/all');
    const isBookClubCreate = location.pathname.startsWith('/book-clubs/new');

    return (
        <>
            <div id="sidebar__container">
                {isDashboard && userBookClubs && (
                    <div class='sidebar__bookclubs'>
                        <div className='sidebar__bookclub--items'> {
                            userBookClubs.map(bookClub => (
                                <BookClubItem key={bookClub.id} bookClub={bookClub} />
                            ))}
                        </div>
                        <div className='create__club--link'>
                            {!isBookClubCreate && userMemberships.length < 5 && (
                                <form onSubmit={handleCreateClub}>
                                    <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
                {isBookClubList && (
                    <div className='sidebar__para'>
                        <p>
                            Joining a book club is easy! You can join or create up to 5 book clubs.
                        </p>
                        <p>
                            Once you find one that you like, click to join and get to chatting with your new book club members!
                        </p>
                        <p>
                            You can also create a new community by hosting your own.
                        </p>

                        <div className='create__club--link'>
                            {!isBookClubCreate && userMemberships.length < 5 && (
                                <form onSubmit={handleCreateClub}>
                                    <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                                </form>
                            )}
                        </div>
                    </div>
                )}
                {isBookClubCreate && (
                    <div className='sidebar__para'>
                        <p>
                            Something about how to start a book club.
                        </p>
                        <p>
                            Once you find one that you like, click to join and get to chatting with your new book club members!
                        </p>
                        <p>
                            You can also create a new community by hosting your own.
                        </p>
                    </div>
                )}
                {/* <div className='create__club--link'>
                    {!isBookClubCreate && userMemberships.length < 5 && (
                        <form onSubmit={handleCreateClub}>
                            <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                        </form>
                    )}
                </div> */}
            </div>
        </>
    )
}

export default Sidebar;
