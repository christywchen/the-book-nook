import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { getBookClubMembers, getUserMemberships, addUserMembership, createBookClubMember } from '../../../store/book_club_member';

import './BookClubCard.css';

function BookClubCard({ bookClub }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, image_url, name, description, capacity } = bookClub;

    const sessionUser = useSelector(state => state.session.user);
    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.allMembershipsByClubId[bookClub.id]);

    const userMemberships = Object.values(userMembershipsObj);
    const userMembership = userMembershipsObj[id];

    const [buttonText, setButtonText] = useState(userMembership ? 'Go to Club' : 'Join Now');

    let memberCount;
    if (bookClubMembersObj) memberCount = Object.values(bookClubMembersObj).length;

    const availableSpace = capacity - memberCount;

    useEffect(() => {
        dispatch(getBookClubMembers(id));
        dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch, id, sessionUser]);

    useEffect(() => { }, [availableSpace, memberCount]);

    async function handleMembership(e) {
        e.preventDefault();

        if (buttonText === 'Join Now') {
            const data = await dispatch(createBookClubMember(bookClub.id, sessionUser.id));

            if (!data.errors) {
                await dispatch(addUserMembership(data));
            }

            setButtonText('Go to Club');
        }

        return history.push(`/dashboard/book-clubs/${bookClub.id}/reading-list`);
    }

    return (
        <>
            <section className="bookclub__card">
                <div className='bookclub__card--body'>
                    <div
                        key={id}
                        className="bookclub__card--icon"
                        title={name}>
                        {image_url ? (<img src={image_url} alt='' className='bookclub__card--icon-img' />) : name.slice(0, 1)}
                    </div>
                    <div className='bookclub__card--title'>
                        {name}
                    </div>
                    <div className='bookclub__card--capacity'>{availableSpace || 'No'} {availableSpace === 1 ? 'Space' : 'Spaces'} Available</div>
                    <div className='bookclub__card--description-title'>
                        Description:
                    </div>
                    <div className='bookclub__card--description'>
                        {description || (
                            <span className='bookclub__card--description-none'>No description provided.</span>
                        )}
                    </div>
                </div>
                {(availableSpace >= 1 || buttonText === 'Go to Club') && (<div className='no__memberships--links'>
                    <form onSubmit={handleMembership}>
                        <button className='button' disabled={buttonText === 'Join Now' && userMemberships.length >= 5} type='submit'>{buttonText}</button>
                    </form>
                </div>)}
            </section>
        </>
    )
}

export default BookClubCard;
