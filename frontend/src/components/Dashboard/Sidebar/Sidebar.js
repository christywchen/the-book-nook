import { Link } from 'react-router-dom';

function Sidebar({ userBookClubs }) {

    return (
        <>
            <h3>
                My Book Clubs
            </h3>
            {userBookClubs && userBookClubs.map(bookClub =>
            (<>
                <div>
                    <h4>
                        {bookClub?.name}
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
