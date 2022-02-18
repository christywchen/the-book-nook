import { useHistory } from 'react-router-dom';

function CreateBook({ membershipCount }) {
    const history = useHistory();

    async function handleBrowseBooks(e) {
        e.preventDefault();
        return history.push('/books/all');
    }

    return (
        <>
            <div className='sidebar__para'>
                <p>
                    Tell us a little bit about the book you want to share. Title, author, and language are required.
                </p>
                <p>
                    This way, other users can find out more about it and maybe even suggest it to their book clubs!
                </p>
                <p>
                    Otherwise, you can keep on browsing books shared by our community.
                </p>

                <div className='create__club--link'>
                    <form onSubmit={handleBrowseBooks}>
                        <button className='button button__sidebar--center' type='submit'>Browse Books</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateBook;
