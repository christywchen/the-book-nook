import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from "react-router-dom";

import { getUsers } from "../../../store/user";
import { getAllBookClubs, deleteBookClub } from "../../../store/book_club";
import { removeUserMembership, getBookClubMembers, deleteBookClubMember } from "../../../store/book_club_member";

import './DetailsBar.css';

function DetailsBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const sessionUser = useSelector(state => state.session.user);
    const userMemberships = useSelector(state => state.bookClubMember.byUserMembershipId);
    const usersObj = useSelector(state => state.user.byUserId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.allMembershipsByClubId[id]);


    const bookClub = allBookClubsObj[id];
    const users = Object.values(usersObj);

    let bookClubMembers;
    if (bookClubMembersObj) {
        bookClubMembers = Object.values(bookClubMembersObj);
    }

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBookClubMembers(id));
    }, [dispatch, id]);

    // console.log(userMemberships, 'MEMBERSHIPPPPS')

    async function handleEditClub(e) {
        e.preventDefault();

        return history.push(`/book-clubs/${id}/edit`);
    }

    async function handleDeleteClub(e) {
        e.preventDefault();
        await dispatch(deleteBookClub(bookClub.id));
        await dispatch(removeUserMembership(bookClub.id));

        return history.push('/dashboard');
    }

    async function handleLeaveClub(e) {
        e.preventDefault();
        await dispatch(removeUserMembership(bookClub.id));
        await dispatch(deleteBookClubMember(bookClub.id, sessionUser.id));

        return history.push('/dashboard');
    }


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
                        <div className='details__heading'>
                            <div className='details__title'>
                                {bookClub.name}
                            </div>
                            {bookClub.host_id === sessionUser.id && (
                                <form className='details__edit--form' onSubmit={handleEditClub}>
                                    <button className='button button__details--edit' type='submit'>Edit</button>
                                </form>)}
                        </div>
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
                        <div className='details__title'>
                            Members
                        </div>
                        <ul>{members && members.map(member => {
                            if (member) {
                                return (<>
                                    <li key={member.id}>{member.first_name}</li>
                                </>
                                )
                            }
                        })}
                        </ul>

                        {bookClub.host_id === sessionUser.id ?
                            (<Link onClick={handleDeleteClub}>Delete Book Club</Link>) :
                            (<Link onClick={handleLeaveClub} to='/'>Leave Book Club</Link>)
                        }
                    </>)}
            </div>
        </>
    )
}

export default DetailsBar;
