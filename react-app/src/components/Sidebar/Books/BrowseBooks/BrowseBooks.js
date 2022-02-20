import { useHistory } from 'react-router-dom';

function BrowseBooks() {
    const history = useHistory();

    async function handleAddBook(e) {
        e.preventDefault();
        return history.push('/books/new');
    }

    return (
        <>
            <div className='sidebar__para'>
                <p>
                    Here are some books that have been added by our community members.
                </p>
                <p>
                    Choose some that interest you to add them to your book club's reading list.
                </p>
                <p>
                    If you don't see anything you like, help us expand our community library by adding some more books!
                </p>

                <div className='create__club--link'>
                    <form onSubmit={handleAddBook}>
                        <button className='button button__sidebar--center' type='submit'>Add a Book</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default BrowseBooks;
