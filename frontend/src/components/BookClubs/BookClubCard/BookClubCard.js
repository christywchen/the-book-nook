import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getAllBookClubs } from '../../../store/book_club';
import { getBookClubMembers } from '../../../store/book_club_member';

import './BookClubCard.css';

function BookClubCard({ bookClub }) {
    const dispatch = useDispatch();
    const { id, name, description, host_id, image_url, capacity } = bookClub;
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    const bookClubMembersObj = useSelector(state => state.bookClubMember.byBookClubMemberId);
    const memberCount = Object.values(bookClubMembersObj).length;
    const availableSpace = bookClub.capacity - memberCount;

    useEffect(() => {
        dispatch(getBookClubMembers(id));
    }, [dispatch]);

    useEffect(() => { }, [availableSpace]);

    return (
        <>
            <div className="bookclub__card">
                {/* <div className='event__card--image event__card--image-default' style={image_url ? backgroundImage : null}>
                </div> */}
                <div className='event__card--body'>
                    <div className='bookclub__card--title'>
                        {bookClub.name}
                    </div>
                    <div className='event__card--date'>{availableSpace} {availableSpace === 1 ? 'Spot' : 'Spots'} Left</div>
                    <div className='event__card--location'>
                        {bookClub.description}

                    </div>
                </div>
            </div>
        </>
    )
}

export default BookClubCard;
