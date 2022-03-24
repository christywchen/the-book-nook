import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBookClubs } from '../../../../store/book_club';

import BookClubItem from '../BookClubItem/BookClubItem';
import { getAllBookClubChatrooms } from '../../../../store/chatroom';

function JoinedClubs({ userMemberships }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubs = Object.values(allBookClubsObj);
    const [showMore, setShowMore] = useState('');

    useEffect(() => {
        let width = window.innerWidth;

        if (width > 992) {
            setShowMore(true)
        } else {
            setShowMore(false)
        }
    }, []);

    async function handleCreateClub(e) {
        e.preventDefault();
        return history.push('/book-clubs/new');
    }

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getAllBookClubChatrooms());
    }, [dispatch]);


    async function handleBrowseClubs(e) {
        e.preventDefault();
        return history.push('/book-clubs');
    }

    let userBookClubs;
    if (userMemberships && bookClubs) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        }).sort((a, b) => {
            const x = a.name.toLowerCase();
            const y = b.name.toLowerCase();
            return x < y ? -1 : x > y ? 1 : 0;
        });;
    }

    return (
        <>
            {userMemberships.length && bookClubs.length ?
                (<section className='sidebar__bookclubs'>
                    {showMore && (
                        <>
                            <div className='sidebar__bookclub--items'> {userBookClubs &&
                                userBookClubs.map(bookClub => (
                                    <BookClubItem key={bookClub.id} bookClub={bookClub} />
                                ))}
                            </div>
                            <hr className='mobile__divider book__clubs--divider' />
                            <div className='sidebar__cta--link'>
                                {userMemberships.length < 5 && (
                                    <form onSubmit={handleCreateClub}>
                                        <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                                    </form>
                                )}
                            </div>
                        </>
                    )}
                    <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
                </section>
                ) :
                (<>
                    <section className='sidebar__para'>
                        <p>
                            You're not a part of any book clubs at the moment. Why not start one of your own or see what's out there?
                        </p>
                        <p>
                            Who knows, maybe you'll find your next favorite chapter.
                        </p>
                        <div className='no__memberships--links'>
                            <form onSubmit={handleCreateClub}>
                                <button className='button button__sidebar--center-first' type='submit'>Start a Book Club</button>
                            </form>
                            <form onSubmit={handleBrowseClubs}>
                                <button className='button button__sidebar--center-second' type='submit'>Explore Book Clubs</button>
                            </form>
                        </div>
                    </section>
                </>)
            }
        </>
    )
}

export default JoinedClubs;
