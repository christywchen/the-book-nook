import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

function BookClubItem({ bookClub, setShowMore }) {
    const location = useLocation();
    const history = useHistory();
    const [showLinks, setShowLinks] = useState(false);
    const allBookClubChatroomsObj = useSelector(state => state.bookClubChatroom.byId);
    const allBookClubChatrooms = Object.values(allBookClubChatroomsObj);

    const currentLocation = location.pathname.split('/')[3];

    useEffect(() => {
        if (parseInt(currentLocation) !== bookClub.id) {
            setShowLinks(false)
        } else {
            setShowLinks(true)
        }
    }, [currentLocation, bookClub])

    async function handleShowLess() {
        const width = window.innerWidth;

        if (width <= 992) {
            setShowMore(false)
        }
    }

    async function handleClick(e) {
        history.push(`/dashboard/book-clubs/${bookClub.id}/reading-list`);
    }

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
                <div onClick={handleClick} className="sidebar__title">
                    {bookClub.name} <i className="fa-solid fa-angle-down sidebar__caret"></i>
                </div>
                {showLinks ? (
                    <div className="sidebar__links--group">
                        <div>
                            <NavLink activeClassName='sidebar__link--active' to={`/dashboard/book-clubs/${bookClub.id}/reading-list`} onClick={handleShowLess}>
                                Reading List
                            </NavLink>
                        </div>
                        {bookClubChatrooms && bookClubChatrooms.map(chatroom => (
                            <>
                                <div key={chatroom.id}>
                                    <NavLink activeClassName='sidebar__link--active' to={`/dashboard/book-clubs/${bookClub.id}/chats/${chatroom.id}`} onClick={handleShowLess}>
                                        {chatroom.name} Chat
                                    </NavLink>
                                </div>
                            </>
                        ))}
                        <div>
                            <NavLink activeClassName='sidebar__link--active' to={`/dashboard/book-clubs/${bookClub.id}/info`} onClick={handleShowLess}>
                                About the Club
                            </NavLink>
                        </div>
                    </div>
                ) : ''}
            </section>
        </>
    )
}

export default BookClubItem;
