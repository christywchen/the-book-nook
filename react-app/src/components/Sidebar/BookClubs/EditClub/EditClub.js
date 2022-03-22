import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function EditClub() {
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
                            Need to make an update to your book club? No problem.
                        </p>
                        <p>
                            Note that member capacity cannot be below your current member count.
                        </p>
                        <div className='sidebar__cta--link'>
                            <form onSubmit={handleReturn}>
                                <button className='button button__sidebar--center' type='submit'>Back to Your Club</button>
                            </form>
                        </div>
                    </>
                )}
                <div className='mobile__sidebar--cta' onClick={() => setShowMore(!showMore)}>{showMore ? 'Less Info' : 'More Info'}</div>
            </section>
        </>
    )
}

export default EditClub;
