import { Link, useHistory } from 'react-router-dom';

import './BookCard.css';

function BookCard({ book }) {
    const { id, title, author, synopsis, image_url, isbn13, original_title, language, publication_year, pages } = book;
    const history = useHistory();
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    async function handleClick(e) {
        e.preventDefault();

        return history.push(`/books/${book.id}`);
    }

    return (
        <>
            <div className="book__card">
                <Link to={`/books/${id}`}>
                    <div className='book__card--image' style={backgroundImage}>
                    </div>
                </Link>
                <div className='book__card--body'>
                    <div>
                        <div className='book__card--title'>
                            {title.length > 40 ? title.slice(0, 40) + '...' : title}
                        </div>
                        <div className='book__card--author'>
                            by {author.length > 30 ? author.slice(0, 30) + '...' : author}
                        </div>
                        {synopsis && (
                            <div className='book__card--synopsis'>
                                {synopsis.length > 110 ? synopsis.slice(0, 90) + '...' : synopsis}
                            </div>
                        )}
                    </div>
                    <div>
                        <form onSubmit={handleClick}>
                            <button className='button' type='submit'>More</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}


export default BookCard;
