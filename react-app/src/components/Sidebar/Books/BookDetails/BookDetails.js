import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function BookDetails() {
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
                            To add this to your book club's reading list, use the dropdown to select where you want to add the book.
                        </p>
                        <p>
                            Remember to let other members know that you've added it!
                        </p>
                        <p>
                            You can also head back to the library to continue browsing.
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

export default BookDetails;
