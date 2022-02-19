import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';

import { getBook } from '../../../store/book';

function BookDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);
    const book = useSelector(state => state.book.byId[id]);

    useEffect(() => {
        dispatch(getBook(id));
    }, [dispatch])

    if (!book) {
        return (
            <>This book does not exist.</>
        )
    }

    console.log(id, book)
    return (
        <>Book Details
            <p>
                {book.title}
            </p>
            <p>
                {book.author}
            </p>
            <p>
                {book.publication_year}
            </p>
            <p>
                <Link to={`/books/${book.id}/edit`}>Edit Book</Link>
            </p>

        </>
    )
}

export default BookDetails;
