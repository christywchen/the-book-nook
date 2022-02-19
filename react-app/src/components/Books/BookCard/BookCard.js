import { useHistory } from 'react-router-dom';

import './BookCard.css';

function BookCard({ book }) {
    const history = useHistory();

    async function handleClick(e) {
        e.preventDefault();

        return history.push(`/books/${book.id}`);
    }

    return (
        <>
            <div className="book__card">
                {/* <div className='event__card--image event__card--image-default' style={image_url ? backgroundImage : null}>
                </div> */}
                <div className='book__card--body'>
                    <div className='bookclub__card--title'>
                        {book.title} by {book.author}
                    </div>
                    <div className='bookclub__card--text'>{book.language}</div>
                    <div className='bookclub__card--text'>
                        <div className='bookclub__card--text-title'>
                            About:
                        </div>
                        {book.synopsis}

                    </div>
                    <div className='no__memberships--links'>
                        <form onSubmit={handleClick}>
                            <button className='button button__sidebar--center-first' type='submit'>More</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default BookCard;
