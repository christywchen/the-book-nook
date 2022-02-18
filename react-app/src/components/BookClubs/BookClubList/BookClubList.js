import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBookClubs } from "../../../store/book_club";
import { getBookClubMembers } from "../../../store/book_club_member";
import { getUsers } from "../../../store/user";

import BookClubCard from "../BookClubCard/BookClubCard";

import './BookClubList.css'

function BookClubList() {
    const dispatch = useDispatch();
    const bookClubsObj = useSelector(state => state.bookClub.byId);

    let bookClubs;
    if (bookClubsObj) bookClubs = Object.values(bookClubsObj);

    useEffect(() => {
        dispatch(getAllBookClubs());
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Explore Book Clubs</div>
                <div className='bookclub__card--container'>
                    {bookClubs.length > 0 && bookClubs.map(bookClub => (<BookClubCard bookClub={bookClub} />))}
                </div>
            </div>
        </>
    )
}

export default BookClubList;
