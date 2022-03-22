import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function EditBook() {
    const history = useHistory();
    const [showMore, setShowMore] = useState(false);

    async function handleReturn(e) {
        e.preventDefault();
        return history.goBack();
    }

    return (
        <>
            <section className='sidebar__para'>
                {showMore && (
                    <>
                        <p>
                            See a mistake with the details of this book? Help us fix it!
                        </p>
                        <p>
                            Thanks for keeping us and other readers stay updated with our community library.
                        </p>
                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleReturn}>
                                <button className='button button__sidebar--center' type='submit'>Back to the Book</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default EditBook;
