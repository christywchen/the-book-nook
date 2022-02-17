import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getAllBookClubs } from '../../../store/book_club';

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

    // console.log('ALL BOOK CLUBS', allBookClubsObj);
    let userBookClubs;
    if (userMemberships && bookClubs) {
        userBookClubs = userMemberships.map(membership => {
            // console.log('MEMBERSHIP', membership)
            // console.log('MEMBER THING', allBookClubsObj[membership.book_club_id])
            return allBookClubsObj[membership.book_club_id];
        });
    }

    // console.log('USER BOOK CLUBS ARRAY', userBookClubs);
    return (
        <>
            {userMemberships && bookClubs && (<div className='sidebar__bookclubs'>
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
            </div>)}
        </>
    )
}

export default JoinedClubs;
