import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function BrowseBooks() {
    const history = useHistory();
    const [showMore, setShowMore] = useState(false);

    async function handleAddBook(e) {
        e.preventDefault();
        return history.push('/books/new');
    }

    return (
        <>
            <section className='sidebar__para'>
                {showMore && (
                    <>
                        <p>
                            Here are some books that have been added by our community members.
                        </p>
                        <p>
                            Choose some that interest you and add them to your book club's reading list.
                        </p>
                        <p>
                            If you don't see anything you like, help us expand our community library by adding some more books!
                        </p>

                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleAddBook}>
                                <button className='button button__sidebar--center' type='submit'>Add a Book</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default BrowseBooks;
