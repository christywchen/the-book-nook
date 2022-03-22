import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function BrowseClubs() {
    const history = useHistory();
    const [showMore, setShowMore] = useState(true);

    async function handleCreateClub(e) {
        e.preventDefault();
        return history.push('/book-clubs/new');
    }

    return (
        <>
            <section className='sidebar__para'>
                {showMore && (
                    <>
                        <p>
                            Joining a book club is easy! You can join up to 5 book clubs at a time.
                        </p>
                        <p>
                            Once you find one that you like, click to join and get to chatting with your new book club members!
                        </p>
                        <p>
                            You can also create a new community by hosting your own.
                        </p>

                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleCreateClub}>
                                <button className='button button__sidebar--center' type='submit'>Start a Book Club</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default BrowseClubs;
