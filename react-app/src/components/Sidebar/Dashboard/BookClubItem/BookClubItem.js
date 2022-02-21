import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';

function BookClubItem({ bookClub }) {
    const { id } = useParams();
    const location = useLocation();
    const [showLinks, setShowLinks] = useState(false);

    if (!bookClub) {
        return;
    }

    return (
        <>
            <div className="book__club--item" key={bookClub.id}>
                <div onClick={() => setShowLinks(!showLinks)} className="sidebar__title">
                    {bookClub.name} <i className="fa-solid fa-angle-down sidebar__caret"></i>
                </div>
                {showLinks ? (
                    <div className="sidebar__links--group">
                        <p>
                            <Link to={`/dashboard/book-clubs/${bookClub.id}/reading-list`}>
                                Reading List
                            </Link>
                        </p>
                        <p>
                            <Link to={`/dashboard/book-clubs/${bookClub.id}/rooms/general`}>
                                General Chat
                            </Link>
                        </p>
                        <p>
                            <Link to={`/dashboard/book-clubs/${bookClub.id}/rooms/spoilers`}>
                                Spoilers Chat
                            </Link>
                        </p>
                    </div>
                ) : ''}
            </div>
        </>
    )
}

export default BookClubItem;
