import { useState } from 'react';
import { Link } from 'react-router-dom';

function BookClubItem({ bookClub }) {
    const [showLinks, setShowLinks] = useState(false);

    return (
        <>
            <div className="book__club--item" key={bookClub.id}>
                <div onClick={() => setShowLinks(!showLinks)} className="sidebar__title">
                    {bookClub.name} <i class="fa-solid fa-angle-down"></i>
                </div>
                {showLinks ? (
                    <div className="sidebar__links--group">
                        <Link to={`/book-clubs/${bookClub.id}/rooms/general`}>
                            General Chat
                        </Link>
                        <p>
                            <Link to={`/book-clubs/${bookClub.id}/rooms/spoilers`}>
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