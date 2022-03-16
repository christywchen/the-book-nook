import { useHistory } from 'react-router-dom';

function BrowseClubs({ userMemberships }) {
    const history = useHistory();

    async function handleCreateClub(e) {
        e.preventDefault();
        return history.push('/book-clubs/new');
    }

    return (
        <>
            <section className='sidebar__para'>
                <p>
                    Joining a book club is easy! You can join up to 5 book clubs at a time.
                </p>
                <p>
                    Once you find one that you like, click to join and get to chatting with your new book club members!
                </p>
                <p>
                    You can also create a new community by hosting your own.
                </p>

                <div className='create__club--link'>
                    <form onSubmit={handleCreateClub}>
                        <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default BrowseClubs;
