import { Link, useHistory } from 'react-router-dom';

import './BookCard.css';

function BookCard({ book }) {
    const { id, title, author, synopsis, image_url } = book;
    const history = useHistory();
    const backgroundImage = { backgroundImage: `url("${image_url}")` }

    async function handleClick(e) {
        e.preventDefault();

        return history.push(`/books/${book.id}`);
    }

    return (
        <>
            <section className='book__card'>
                <Link to={`/books/${id}`}>
                    <div className='book__card--image' style={backgroundImage}>
                        {!image_url && <>No Cover Image Available</>}
                    </div>
                </Link>
                <div className='book__card--body'>
                    <div>
                        <div className='book__card--title'>
                            {title}
                        </div>
                        <div className='book__card--author'>
                            by {author}
                        </div>
                        {synopsis && (
                            <div className='book__card--synopsis'>
                                <span className='synopsis__text'>
                                    {synopsis}
                                </span>
                            </div>
                        )}
                    </div>
                    <div>
                        <form onSubmit={handleClick}>
                            <button className='button' type='submit'>More</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}


export default BookCard;
