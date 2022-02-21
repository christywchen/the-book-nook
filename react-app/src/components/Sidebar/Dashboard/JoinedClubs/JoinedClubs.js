import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBookClubs } from '../../../../store/book_club';

import BookClubItem from '../BookClubItem/BookClubItem';

function JoinedClubs({ userMemberships }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubs = Object.values(allBookClubsObj);

    async function handleCreateClub(e) {
        e.preventDefault();
        return history.push('/book-clubs/new');
    }

    useEffect(() => {
        dispatch(getAllBookClubs());
    }, [dispatch]);


    async function handleBrowseClubs(e) {
        e.preventDefault();
        return history.push('/book-clubs');
    }

    // console.log('ALL BOOK CLUBS', allBookClubsObj);
    let userBookClubs;
    if (userMemberships && bookClubs) {
        userBookClubs = userMemberships.map(membership => {
            return allBookClubsObj[membership.book_club_id];
        });
    }

    return (
        <>
            {userMemberships.length && bookClubs.length ?
                (<div className='sidebar__bookclubs'>
                    <div className='sidebar__bookclub--items'> {
                        userBookClubs?.map(bookClub => (
                            <BookClubItem key={bookClub.id} bookClub={bookClub} />
                        ))}
                    </div>
                    <div className='create__club--link'>
                        {userMemberships.length < 5 && (
                            <form onSubmit={handleCreateClub}>
                                <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                            </form>
                        )}
                    </div>
                </div>) :
                (<>
                    <div className='sidebar__para'>
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
                    </div>
                </>)
            }
        </>
    )
}

export default JoinedClubs;
