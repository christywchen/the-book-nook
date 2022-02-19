import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBook, getAllBooks, updateBook } from '../../../store/book';

function BookForm({ formType, formProps }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const [title, setTitle] = useState(formProps?.title || '');
    const [author, setAuthor] = useState(formProps?.author || '');
    const [synopsis, setSynopsis] = useState(formProps?.synopsis || '');
    const [imageUrl, setImageUrl] = useState(formProps?.imageUrl || '');
    const [isbn13, setIsbn13] = useState(formProps?.isbn13 || '');
    const [originalTitle, setOriginalTitle] = useState(formProps?.originalTitle || '');
    const [language, setLanguage] = useState(formProps?.language || '');
    const [publicationYear, setPublicationYear] = useState(formProps?.publicationYear || '');
    const [pages, setPages] = useState(formProps?.pages || '');
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (formType === 'createNew') {
            const data = await dispatch(createBook(title, author, synopsis, imageUrl, isbn13, originalTitle, language, publicationYear, pages));

            if (data.errors) {
                setErrors(data.errors);
            } else {
                const book = data;
                return history.push(`/books/${book.id}`)
            }
        }

        if (formType = 'editRecord') {
            let id = formProps.id;

            const data = await dispatch(updateBook(id, title, author, synopsis, imageUrl, isbn13, originalTitle, language, publicationYear, pages));

            if (data.errors) {
                setErrors(data.errors);
            } else {
                return history.goBack();
            }
        }
    }

    async function handleReset(e) {
        e.preventDefault();

        setTitle('');
        setAuthor('');
        setSynopsis('');
        setImageUrl('');
        setIsbn13('');
        setOriginalTitle('');
        setLanguage('');
        setPublicationYear('');
        setPages('');
        setErrors([]);
    }

    return (
        <>
            <div id='form__container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    {errors.length > 0 && (
                        <ul className='auth__container--errors'>{
                            errors.map((error, ind) => (
                                <li key={ind}>{error}</li>
                            ))
                        }
                        </ul>
                    )}
                    <div>
                        <label>Book Title</label>
                        <input
                            name='title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Author</label>
                        <input
                            name='author'
                            type='text'
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <label>Synopsis</label>
                        <textarea
                            className='form__textarea--lg'
                            name='synopsis'
                            type='text'
                            value={synopsis}
                            onChange={e => setSynopsis(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <label>Book Cover Url</label>
                        <input
                            name='image_url'
                            type='text'
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        ></input>
                    </div>
                    <div className='input__split'>
                        <div>
                            <label>ISBN13</label>
                            <input
                                name='isbn13'
                                type='text'
                                placeholder='Ex. 9782123456803'
                                value={isbn13}
                                onChange={e => setIsbn13(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Publication Year</label>
                            <input
                                name='publication_year'
                                type='number'
                                placeholder='Ex. 1984'
                                value={publicationYear}
                                onChange={e => setPublicationYear(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    {/* <div>
                        <label>Original Title</label>
                        <input
                            name='original_title'
                            type='text'
                            value={originalTitle}
                            onChange={e => setOriginalTitle(e.target.value)}
                        ></input>
                    </div> */}
                    <div className='input__split'>
                        <div>
                            <label>Language</label>
                            <input
                                name='language'
                                type='text'
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <label>Page Count</label>
                            <input
                                name='page_count'
                                type='number'
                                value={pages}
                                onChange={e => setPages(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className='form__buttons'>
                        <button
                            disabled={!title || !author || !language || !imageUrl}
                            className='button' type='submit'>Submit</button>
                        <hr />
                        <button
                            disabled={!(title || author || synopsis || imageUrl || isbn13 || originalTitle || language || publicationYear || pages)}
                            className='button' type='reset'>Reset</button>
                    </div>
                </form>
            </div >
        </>
    )
}

export default BookForm;
