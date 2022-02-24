import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";

import { getUsers } from "../../../store/user";
import { getAllBookClubs, deleteBookClub } from "../../../store/book_club";
import { removeUserMembership, getBookClubMembers, deleteBookClubMember } from "../../../store/book_club_member";

import './DetailsBar.css';

function DetailsBar() {
    const history = useHistory();
    const dispatch = useDispatch();
    const { bookClubId } = useParams();
    const [showDelete, setShowDelete] = useState(false);
    const [showLeave, setShowLeave] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const usersObj = useSelector(state => state.user.byId);
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClubMembersObj = useSelector(state => state.bookClubMember.allMembershipsByClubId[bookClubId]);
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBooksObj = useSelector(state => state.book.byId);

    const bookClub = allBookClubsObj[bookClubId];
    const users = Object.values(usersObj);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    let bookClubMembers;
    if (bookClubMembersObj) {
        bookClubMembers = Object.values(bookClubMembersObj);
    }

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getUsers());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getBookClubMembers(bookClubId));
    }, [dispatch, bookClubId]);


    async function handleEditClub(e) {
        e.preventDefault();
        return history.push(`/book-clubs/${bookClubId}/edit`);
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

    let members, host;
    if (bookClubMembers && users) {
        members = bookClubMembers.map(member => {
            return usersObj[member.user_id];
        });

        host = usersObj[bookClub?.host_id];
    }

    let currentBooks;
    if (allBookClubBooks && allBooksObj) {

        const currentBookClubBooks = allBookClubBooks.filter(bookClubBook => bookClubBook.book_club_id === parseInt(bookClubId, 10) && bookClubBook.status === 2);
        currentBooks = currentBookClubBooks.map(bookClubBook => {
            const bookId = bookClubBook.book_id;
            return allBooksObj[bookId]

        });
    }


    return (
        <>
            <section id="details__container">
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
                        <div className='details__subdesc'>
                            Since {bookClub.created_at.split(' ')[3]} // Hosted by {host?.username}
                        </div>
                        {bookClub.description && (<div className='details__subsec'>
                            <div className='details__subtitle'>
                                Description
                            </div>
                            <div className='details__subbox details__description'>
                                {bookClub.description.replace(/\n+/g, '\n\n')}
                            </div>
                        </div>)}
                        <div className='details__subsec'>
                            <div className='details__subtitle'>
                                Members
                            </div>
                            <div className='details__subbox details__members'>
                                <div className='details__members--list'>
                                    {members && members.map(member => {
                                        if (member) {
                                            return (
                                                <div key={member.id}>{member.username}</div>
                                            )
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                        {currentBooks.length > 0 && (<div className='details__subsec'>
                            <div className='details__subtitle'>
                                Currently Reading
                            </div>
                            <div className='details__subbox details__currentreads'>
                                <ul>
                                    {currentBooks.map(book => (
                                        <li key={book?.id}>
                                            <Link className='details__currentreads--title'
                                                to={`/books/${book?.id}`}>
                                                {book?.title}
                                            </Link> by {book?.author}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>)}
                        {bookClub.host_id === sessionUser.id ?
                            (<>
                                <div className='details__deleteleave' onClick={() => setShowDelete(!showDelete)}>Delete Book Club</div>
                                {showDelete && (
                                    <div className='details__subbox details__description details__deleteleave--confirm'>
                                        Are you sure? This cannot be undone. <span className='details__deleteleave--link' onClick={handleDeleteClub}>Yes</span> // <span className='details__deleteleave--link' onClick={() => setShowDelete(false)}>No</span>
                                    </div>
                                )}
                            </>) :
                            (<>
                                <div className='details__deleteleave' onClick={() => setShowLeave(!showLeave)}>Leave Book Club</div>
                                {showLeave && (
                                    <div className='details__subbox details__description details__deleteleave--confirm'>
                                        Are you sure you want to leave? <span className='details__deleteleave--link' onClick={handleLeaveClub}>Yes</span> // <span className='details__deleteleave--link' onClick={() => setShowLeave(false)}>No</span>
                                    </div>
                                )}
                            </>
                            )
                        }
                    </>)}
            </section>
        </>
    )
}

export default DetailsBar;
