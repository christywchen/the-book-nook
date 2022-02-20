import { useHistory } from 'react-router-dom';

function BookDetails() {
    const history = useHistory();

    async function handleBrowseBooks(e) {
        e.preventDefault();
        return history.push('/books/all');
    }

    return (
        <>
            <div className='sidebar__para'>
                <p>
                    To add this to your book club's reading list, use the dropdown to select where you want to add the book.
                </p>
                <p>
                    Remember to let other members know that you've added it!
                </p>
                <p>
                    You can also head back to the library to continue browsing.
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

export default BookDetails;
