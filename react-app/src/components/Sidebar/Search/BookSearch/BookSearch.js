import { Link, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

function BookSearch() {
    const history = useHistory();
    const [showMore, setShowMore] = useState('');

    useEffect(() => {
        const width = window.innerWidth;

        if (width > 992) {
            setShowMore(true)
        } else {
            setShowMore(false)
        }
    }, []);

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
                            Here are all the books whose author or title starts with what you queried.
                        </p>
                        <p>
                            If you don't see what you're looking for, consider <Link className='link__bolded' to='/books/new'>adding it</Link> to our library or browsing our community library of awesome books.
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

export default BookSearch;
