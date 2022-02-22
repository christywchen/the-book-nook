import { useHistory } from 'react-router-dom';

function CreateClub({ userMemberships }) {
    const history = useHistory();
    async function handleBrowseClubs(e) {
        e.preventDefault();
        return history.push('/book-clubs');
    }

    return (
        <>
            <section className='sidebar__para'>
                <p>
                    Tell us and other users a little about the book club you want to create.
                </p>
                <p>
                    As the host, you'll be in charge of making sure the book club runs smoothly.
                </p>
                <p>
                    Or, you can simply browse existing book clubs and join one that you like.
                </p>
                <div className='create__club--link'>
                    <form onSubmit={handleBrowseClubs}>
                        <button className='button button__sidebar--center' type='submit'>Explore Book Clubs</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default CreateClub;
