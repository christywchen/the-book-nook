import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getBookClubMembers, getUserMemberships, removeUserMembership, deleteBookClubMember, addUserMembership, createBookClubMember } from '../../../store/book_club_member';

import './BookClubCard.css';

function BookClubCard({ bookClub }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, name, description, host_id, image_url, capacity } = bookClub;
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    const sessionUser = useSelector(state => state.session.user);
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.allMembershipsByClubId[bookClub.id]);

    const userMemberships = Object.values(userMembershipsObj);
    const userMembership = userMembershipsObj[id];

    const [buttonText, setButtonText] = useState(userMembership ? 'Go to Club' : 'Join Now');

    let memberCount;
    if (bookClubMembersObj) memberCount = Object.values(bookClubMembersObj).length;

    const availableSpace = bookClub.capacity - memberCount;

    useEffect(() => {
        dispatch(getBookClubMembers(id));
        dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch]);

    useEffect(() => { }, [availableSpace, memberCount]);

    async function handleMembership(e) {
        e.preventDefault();

        if (buttonText === 'Join Now') {
            const data = await dispatch(createBookClubMember(bookClub.id, sessionUser.id));

            if (!data.errors) {
                await dispatch(addUserMembership(data));
            }
        }

        return history.push(`/dashboard/book-clubs/${bookClub.id}`);
    }

    return (
        <>
            <div className="bookclub__card">
                {/* <div> */}
                <div className='bookclub__card--body'>
                    <div
                        key={bookClub.id}
                        className="bookclub__card--icon"
                        title={bookClub.name}>
                        {bookClub.image_url ? (<img src={bookClub.image_url} alt='' className='bookclub__card--icon-img' />) : bookClub.name.slice(0, 1)}
                    </div>
                    <div className='bookclub__card--title'>
                        {bookClub.name}
                    </div>
                    <div className='bookclub__card--capacity'>{availableSpace || 'No'} {availableSpace === 1 ? 'Space' : 'Spaces'} Available</div>
                    <div className='bookclub__card--description-title'>
                        Description:
                    </div>
                    <div className='bookclub__card--description'>
                        {bookClub.description || (
                            <span className='bookclub__card--description-none'>No description provided.</span>
                        )}
                    </div>
                </div>
                {(availableSpace >= 1 || buttonText === 'Go to Club') && (<div className='no__memberships--links'>
                    <form onSubmit={handleMembership}>
                        <button className='button' disabled={buttonText === 'Join Now' && userMemberships.length >= 5} type='submit'>{buttonText}</button>
                    </form>
                </div>)}
            </div>
            {/* </div> */}
        </>
    )
}

export default BookClubCard;
