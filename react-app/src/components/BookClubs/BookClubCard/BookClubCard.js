import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getAllBookClubs } from '../../../store/book_club';
import { getBookClubMembers, getUserMemberships, removeUserMembership, deleteBookClubMember, addUserMembership, createBookClubMember } from '../../../store/book_club_member';

import './BookClubCard.css';

function BookClubCard({ bookClub }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id, name, description, host_id, image_url, capacity } = bookClub;
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    const sessionUser = useSelector(state => state.session.user);

    const userMembershipsObj = useSelector(state => state.bookClubMember.userMembershipsByClubId);
    const userMemberships = Object.values(userMembershipsObj);
    const userMembership = userMembershipsObj[id];

    const [membershipCount, setMembershipCount] = useState(userMemberships.length);
    const [buttonText, setButtonText] = useState(userMembership ? 'Go to Club' : 'Join Now');
    const [disableButton, setDisableButton] = useState(false);

    const allUsersObj = useSelector(state => state.user.byUserId);

    const bookClubMembersObj = useSelector(state => state.bookClubMember.allMembershipsByClubId[bookClub.id]);

    console.log(bookClubMembersObj, 'MEMBERS OBJ')
    let memberCount;
    if (bookClubMembersObj) memberCount = Object.values(bookClubMembersObj).length;
    // const [availableSpace, setAvailableSpace] = useState(bookClub.capacity - memberCount)

    console.log(bookClub.id, bookClub.capacity, memberCount)
    const availableSpace = bookClub.capacity - memberCount;

    useEffect(() => {
        // dispatch(getAllBookClubMem)
        dispatch(getBookClubMembers(id));
        dispatch(getUserMemberships(sessionUser.id));
    }, [dispatch]);

    useEffect(() => { }, [availableSpace, memberCount]);

    console.log(membershipCount, 'MEMBERHSIP COUNT BEFORE')

    console.log(availableSpace, 'avaible space before')
    async function handleMembership(e) {
        e.preventDefault();

        if (buttonText == 'Go to Club') {
            // await dispatch(deleteBookClubMember(bookClub.id, sessionUser.id));
            // await dispatch(removeUserMembership(bookClub.id));
            // setButtonText('Join Club');

            // console.log('left club')

            return history.push(`/dashboard/book-clubs/${bookClub.id}`);
        }

        if (buttonText == 'Join Now') {
            const membership = await dispatch(createBookClubMember(bookClub.id, sessionUser.id));
            // await dispatch(getUserMemberships(sessionUser.id));
            await dispatch(addUserMembership(membership));

            setButtonText('Leave Club');

            console.log('joined club')
        }
        return history.push(`/dashboard/book-clubs/${bookClub.id}`);
        console.log(membershipCount, 'AFTERMEMBERSHIP COUNT')
        console.log(availableSpace, 'avaible space after')
    }

    return (
        <>
            <div className="bookclub__card">
                {/* <div className='event__card--image event__card--image-default' style={image_url ? backgroundImage : null}>
                </div> */}
                <div className='bookclub__card--body'>
                    <div className='bookclub__card--title'>
                        {bookClub.name}
                    </div>
                    <div className='bookclub__card--capacity'>{availableSpace} {availableSpace === 1 ? 'Spot' : 'Spots'} Left</div>
                    <div className='bookclub__card--description'>
                        <div className='bookclub__card--description-title'>
                            About:
                        </div>
                        {bookClub.description}

                    </div>
                    <div className='no__memberships--links'>
                        <form onSubmit={handleMembership}>
                            <button className='button button__sidebar--center-first' disabled={buttonText === 'Join Now' && userMemberships.length >= 5} type='submit'>{buttonText}</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookClubCard;
