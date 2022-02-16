import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { getUsers } from "../../../store/user";
import { getAllBookClubs } from "../../../store/book_club";
import { getBookClubMembers } from "../../../store/book_club_member";

import './DetailsBar.css';

function DetailsBar() {
    const dispatch = useDispatch();
    const { bookClubId } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const usersObj = useSelector(state => state.user.byUserId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.byBookClubMemberId);

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBookClubMembers(bookClubId));
    }, [dispatch, bookClubId]);

    const bookClub = allBookClubsObj[bookClubId];
    const users = Object.values(usersObj);
    const bookClubMembers = Object.values(bookClubMembersObj);

    let members;
    if (bookClubMembers && users) {
        members = bookClubMembers.map(member => {
            return usersObj[member.user_id];
        });
    }

    // console.log(sessionUser.id, bookClub.host_id)

    return (
        <>
            <div id="details__container">
                {bookClub && (
                    <>
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

                        {bookClub.host_id === sessionUser.id ?
                            (<Link to='/'>Delete Book Club</Link>) :
                            (<Link to='/'>Leave Book Club</Link>)
                        }
                    </>)}
            </div>
        </>
    )
}

export default DetailsBar;
