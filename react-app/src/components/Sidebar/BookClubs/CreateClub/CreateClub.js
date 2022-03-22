import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function CreateClub() {
    const history = useHistory();
    const [showMore, setShowMore] = useState(true);

    async function handleBrowseClubs(e) {
        e.preventDefault();
        return history.push('/book-clubs');
    }

    return (
        <>
            <section className='sidebar__para'>
                {showMore && (
                    <>
                        <p>
                            Tell us and other users a little about the book club you want to create.
                        </p>
                        <p>
                            As the host, you'll be in charge of making sure the book club runs smoothly.
                        </p>
                        <p>
                            Or, you can simply browse existing book clubs and join one that you like.
                        </p>
                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleBrowseClubs}>
                                <button className='button button__sidebar--center' type='submit'>Explore Book Clubs</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default CreateClub;
