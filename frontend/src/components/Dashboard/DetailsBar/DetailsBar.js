import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getUsers } from "../../../store/user";
import { getBookClub } from "../../../store/book_club";
import { getBookClubMembers } from "../../../store/book_club_member";

function DetailsBar({ allBookClubsObj }) {
    const dispatch = useDispatch();
    const { bookClubId } = useParams();
    const usersObj = useSelector(state => state.user.byUserId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.byBookClubMemberId);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBookClubMembers(bookClubId));
    }, [bookClubId]);

    const bookClub = allBookClubsObj[bookClubId];
    const users = Object.values(usersObj);
    const bookClubMembers = Object.values(bookClubMembersObj);

    let members;
    if (bookClubMembers && users) {
        members = bookClubMembers.map(member => {
            return usersObj[member.user_id];
        });
    }

    return (
        <>
            {bookClub && (<div>
                <h3>
                    Book Club Details
                </h3>
                <ul>
                    <li>
                        Name: {bookClub.name}
                    </li>
                    <li>
                        Description: {bookClub.description}
                    </li>
                    <li>
                        Host: {bookClub.host_id}
                    </li>
                    <li>
                        Created At: {bookClub.created_at}
                    </li>
                </ul>
                <h3>
                    Book Club Members
                </h3>
                <ul>{members && members.map(member => {
                    if (member) {
                        return (<>
                            <li key={member.id}>{member.first_name}</li>
                        </>
                        )
                    }
                }
                )}
                </ul>
            </div>)}
        </>
    )
}

export default DetailsBar;
