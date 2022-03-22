import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function CreateBook({ membershipCount }) {
    const history = useHistory();
    const [showMore, setShowMore] = useState(false);

    async function handleBrowseBooks(e) {
        e.preventDefault();
        return history.push('/books/all');
    }

    return (
        <>
            <section className='sidebar__para'>
                {showMore && (
                    <>
                        <p>
                            Tell us a little bit about the book you want to share. Title, author, and language are required.
                        </p>
                        <p>
                            This way, other users can learn more about it and maybe even suggest it to their book clubs!
                        </p>
                        <p>
                            Otherwise, you can keep on browsing books shared by our community.
                        </p>

                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleBrowseBooks}>
                                <button className='button button__sidebar--center' type='submit'>Browse Books</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default CreateBook;
