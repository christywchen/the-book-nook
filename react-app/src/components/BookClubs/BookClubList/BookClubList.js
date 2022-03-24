import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllBookClubs } from "../../../store/book_club";
import { getUsers } from "../../../store/user";

import BookClubCard from "../BookClubCard/BookClubCard";

import './BookClubList.css'

function BookClubList() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const bookClubsObj = useSelector(state => state.bookClub.byId);

    let bookClubs;
    if (bookClubsObj) bookClubs = Object.values(bookClubsObj).sort((a, b) => {
        const x = a.name.toLowerCase();
        const y = b.name.toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
    });;

    useEffect(() => {
        if (sessionUser.id) {
            dispatch(getAllBookClubs());
            dispatch(getUsers());
        }
    }, [dispatch]);

    return (
        <>
            <section id='wide__container'>
                <div id='wide__subcontainer--centered'>
                    <div id='wide__title'>Explore Book Clubs</div>
                    <div className='bookclub__card--container'>
                        {bookClubs.length > 0 ? (
                            <>
                                {bookClubs.map(bookClub => (<BookClubCard key={bookClub.id} bookClub={bookClub} />))}
                            </>
                        ) : (
                            <div className='content__unavail'>
                                No book clubs at the moment. Maybe you start one of your own?
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default BookClubList;
