import { useHistory } from 'react-router-dom';

function EditBook() {
    const history = useHistory();

    async function handleReturn(e) {
        e.preventDefault();
        return history.goBack();
    }

    return (
        <>
            <section className='sidebar__para'>
                <p>
                    See a mistake with the details of this book? Help us fix it!
                </p>
                <p>
                    Thanks for keeping us and other readers stay updated with our community library.
                </p>
                <div className='create__club--link'>
                    <form onSubmit={handleReturn}>
                        <button className='button button__sidebar--center' type='submit'>Back to the Book</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default EditBook;
