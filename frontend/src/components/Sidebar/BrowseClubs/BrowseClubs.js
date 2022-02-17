import { useHistory } from 'react-router-dom';

function BrowseClubs({ membershipCount }) {
    const history = useHistory();

    async function handleCreateClub(e) {
        e.preventDefault();
        return history.push('/book-clubs/new');
    }

    return (
        <>
            <div className='sidebar__para'>
                <p>
                    Joining a book club is easy! You can join or create up to 5 book clubs.
                </p>
                <p>
                    Once you find one that you like, click to join and get to chatting with your new book club members!
                </p>
                <p>
                    You can also create a new community by hosting your own.
                </p>

                <div className='create__club--link'>
                    {!membershipCount < 5 && (
                        <form onSubmit={handleCreateClub}>
                            <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default BrowseClubs;
