import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { getBook } from "../../../store/book";
import BookForm from "../../Forms/BookForm/BookForm";

function BookEdit() {
    const formType = 'editRecord';

    const { id } = useParams();
    const dispatch = useDispatch();
    const book = useSelector(state => state.book.byId[id]);

    useEffect(() => {
        dispatch(getBook(id));
    }, [dispatch, id]);

    let formProps;
    if (book) {
        formProps = {
            id: book.id,
            title: book.title,
            author: book.author,
            synopsis: book.synopsis,
            imageUrl: book.image_url,
            isbn13: book.isbn13,
            originalTitle: book.originalTitle,
            language: book.language,
            publicationYear: book.publication_year,
            pages: book.pages
        }
    }

    return (
        <div id='wide__container'>
            <div id='wide__title'>Edit Book</div>
            {book && <BookForm formType={formType} formProps={formProps} />}
        </div>
    )
}

export default BookEdit;
