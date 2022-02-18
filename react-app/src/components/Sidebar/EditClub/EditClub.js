import { useHistory } from 'react-router-dom';

function EditClub({ userMemberships }) {
    const history = useHistory();

    async function handleReturn(e) {
        e.preventDefault();
        return history.goBack();
    }

    return (
        <>
            <div className='sidebar__para'>
                <p>
                    Need to make an update to your book club? No problem.
                </p>
                <p>
                    Note that member capacity cannot be below your current member count.
                </p>
                <div className='create__club--link'>
                    <form onSubmit={handleReturn}>
                        <button className='button button__sidebar--center' type='submit'>Back to Your Club</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditClub;
