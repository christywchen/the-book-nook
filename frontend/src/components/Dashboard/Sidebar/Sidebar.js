import { Link } from 'react-router-dom';

function Sidebar({ userBookClubs }) {

    return (
        <>
            <h5>
                My Book Clubs
            </h5>
            {userBookClubs && userBookClubs.map(bookClub =>
            (<>
                <div key={bookClub.id}>
                    <h4>
                        {bookClub.name}
                    </h4>
                    <p>
                        <Link to={`/dashboard/clubs/${bookClub.id}/general`}>
                            General Chat
                        </Link>
                    </p>
                    <p>
                        <Link to={`/dashboard/clubs/${bookClub.id}/spoilers`}>
                            Spoilers Chat
                        </Link>
                    </p>
                </div>
            </>
            )
            )}

        </>
    )
}

export default Sidebar;
