import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getBookClubMembers } from "../../../store/book_club_member";
import { getUsers } from "../../../store/user";

function DetailsBar({ bookClubs }) {
    const dispatch = useDispatch();
    const { bookClubId } = useParams();
    const usersObj = useSelector(state => state.user.byUserId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.byBookClubMemberId);

    const bookClub = bookClubs[bookClubId];

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getBookClubMembers(bookClubId))
    }, [dispatch]);

    function getMembers(bookClubId) {
        const bookClubMembers = Object.values(bookClubMembersObj);

        console.log('TEEST', bookClubMembers)

        return bookClubMembers.map(member => {
            return usersObj[member.user_id];
        });
    }

    let bookClubMembers;
    if (bookClubMembersObj) {
        bookClubMembers = getMembers(bookClubId);
    }

    console.log(bookClubMembers, 'MEMBERSSS')

    return (
        <>
            <div>
                <h3>
                    Book Club Details
                </h3>
                <ul>
                    <li>
                        Name: {bookClub?.name}
                    </li>
                    <li>
                        Description: {bookClub?.description}
                    </li>
                    <li>
                        Host: {bookClub?.host_id}
                    </li>
                    <li>
                        Created At: {bookClub?.created_at}
                    </li>
                </ul>
                <h3>
                    Book Club Members
                </h3>
                <ul>
                    {bookClubMembers && bookClubMembers.map(member =>
                    (<>
                        <li key={member?.id}>{member?.first_name}</li>
                    </>
                    )
                    )}
                </ul>
            </div>
        </>
    )
}

export default DetailsBar;
