import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookClubs } from '../../../store/book_club';

function Sidebar({ userBookClubs }) {

    return (
        <>
            My Book Clubs
            <ul>
                {userBookClubs && userBookClubs.map(bookClub =>
                (<li key={bookClub.id}>
                    <Link to={`/dashboard/book-clubs/${bookClub.id}/general`}>
                        {bookClub.name}
                    </Link>
                </li>)
                )}
            </ul>

        </>
    )
}

export default Sidebar;
