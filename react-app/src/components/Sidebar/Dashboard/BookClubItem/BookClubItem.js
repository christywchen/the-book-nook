import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

import { getBookClubChatrooms } from '../../../../store/chatroom';

function BookClubItem({ bookClub }) {
    const dispatch = useDispatch();
    const location = useLocation();
    const [showLinks, setShowLinks] = useState(false);
    const sessionUser = useSelector(state => state.session.user);
    const allBookClubChatroomsObj = useSelector(state => state.bookClubChatroom.byId);
    const allBookClubChatrooms = Object.values(allBookClubChatroomsObj);

    // useEffect(() => {
    //     dispatch(getBookClubChatrooms(id));
    // }, [])

    // console.log(allBookClubChatroomsObj);

    let bookClubChatrooms;
    if (allBookClubChatrooms && bookClub) {
        bookClubChatrooms = allBookClubChatrooms.filter(chatroom => chatroom.book_club_id === parseInt(bookClub.id, 10));
    }

    if (!bookClub) {
        return;
    }

    return (
        <>
            <section className="book__club--item" key={bookClub.id}>
                <div onClick={() => setShowLinks(!showLinks)} className="sidebar__title">
                    {bookClub.name} <i className="fa-solid fa-angle-down sidebar__caret"></i>
                </div>
                {showLinks ? (
                    <div className="sidebar__links--group">
                        <div>
                            <Link to={`/dashboard/book-clubs/${bookClub.id}/reading-list`}>
                                Reading List
                            </Link>
                        </div>
                        {bookClubChatrooms && bookClubChatrooms.map(chatroom => (
                            <>
                                <div>
                                    <Link to={`/dashboard/book-clubs/${bookClub.id}/chats/${chatroom.id}`}>
                                        {chatroom.name} Chat
                                    </Link>
                                </div>
                            </>
                        ))}
                    </div>
                ) : ''}
            </section>
        </>
    )
}

export default BookClubItem;
