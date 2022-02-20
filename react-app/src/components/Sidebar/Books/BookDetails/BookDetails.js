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
                    To suggest this book to your book club, use the dropdown to select the book club whose reading list you want to add the book to.
                </p>
                <p>
                    Don't forget to let other book club members know that you've added something to the reading list!
                </p>
                <p>
                    Or, you can head back to the library to continue browsing.
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
