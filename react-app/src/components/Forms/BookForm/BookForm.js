import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBook, updateBook } from '../../../store/book';

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

    const [titleError, setTitleError] = useState('');
    const [authorError, setAuthorError] = useState('');
    const [isbn13Error, setIsbn13Error] = useState('');
    const [originalTitleError, setOriginalTitleError] = useState('');
    const [languageError, setLanguageError] = useState('');
    const [publicationYearError, setPublicationYearError] = useState('');
    const [pagesError, setPagesError] = useState('');
    const [errorNotif, setErrorNotif] = useState(false);

    function setErrors(data) {
        if (data.errors.title) setTitleError(data.errors.title);
        else setTitleError('');

        if (data.errors.author) setAuthorError(data.errors.author);
        else setAuthorError('');

        if (data.errors.isbn13) setIsbn13Error(data.errors.isbn13);
        else setIsbn13Error('');

        if (data.errors.original_title) setOriginalTitleError(data.errors.original_title);
        else setOriginalTitleError('');

        if (data.errors.language) setLanguageError(data.errors.language);
        else setLanguageError('');

        if (data.errors.publication_year) setPublicationYearError(data.errors.publication_year);
        else setPublicationYearError('');

        if (data.errors.pages) setPagesError(data.errors.pages);
        else setPagesError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formType === 'createNew') {
            const data = await dispatch(createBook(title, author, synopsis, imageUrl, isbn13, originalTitle, language, publicationYear, pages));

            if (data.errors) {
                setErrorNotif(true);
                setErrors(data);
            } else {
                const book = data;
                return history.push(`/books/${book.id}`)
            }
        }

        if (formType === 'editRecord') {
            let id = formProps.id;

            const data = await dispatch(updateBook(id, title, author, synopsis, imageUrl, isbn13, originalTitle, language, publicationYear, pages));

            if (data.errors) {
                setErrorNotif(true);
                setErrors(data);
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

        setTitleError('');
        setAuthorError('');
        setIsbn13Error('');
        setOriginalTitleError('');
        setLanguageError('');
        setPublicationYearError('');
        setPagesError('');

        setErrorNotif(false);
    }

    return (
        <>
            <div id='form__container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
                    <div>
                        <div className='label__section'>
                            <label>Title*</label>
                            <span className='error__message'>
                                {titleError}
                            </span>
                        </div>
                        <input
                            name='title'
                            type='text'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Author*</label>
                            <span className='error__message'>
                                {authorError}
                            </span>
                        </div>
                        <input
                            name='author'
                            type='text'
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Synopsis</label>
                        </div>
                        <textarea
                            className='form__textarea--lg'
                            name='synopsis'
                            type='text'
                            value={synopsis}
                            onChange={e => setSynopsis(e.target.value)}
                        ></textarea>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Book Cover URL</label>
                        </div>
                        <input
                            name='image_url'
                            type='text'
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                        ></input>
                    </div>
                    <div>
                        <div className='label__section'>
                            <label>Original Title</label>
                            <span className='error__message'>
                                {originalTitleError}
                            </span>
                        </div>
                        <input
                            name='original_title'
                            type='text'
                            value={originalTitle}
                            onChange={e => setOriginalTitle(e.target.value)}
                        ></input>
                    </div>
                    <div className='input__split'>
                        <div>
                            <div className='label__section'>
                                <label>ISBN13</label>
                                <span className='error__message'>
                                    {isbn13Error}
                                </span>
                            </div>
                            <input
                                name='isbn13'
                                type='text'
                                placeholder='Ex. 9782123456803'
                                value={isbn13}
                                onChange={e => setIsbn13(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <div className='label__section'>
                                <label>Publication Year</label>
                                <span className='error__message'>
                                    {publicationYearError}
                                </span>
                            </div>
                            <input
                                name='publication_year'
                                type='number'
                                placeholder='Ex. 1984'
                                value={publicationYear}
                                onChange={e => setPublicationYear(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className='input__split'>
                        <div>
                            <div className='label__section'>
                                <label>Language*</label>
                                <span className='error__message'>
                                    {languageError}
                                </span>
                            </div>
                            <input
                                name='language'
                                type='text'
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                            ></input>
                        </div>
                        <div>
                            <div>
                                <div className='label__section'>
                                    <label>Pages</label>
                                    <span className='error__message'>
                                        {pagesError}
                                    </span>
                                </div>
                                <input
                                    name='page_count'
                                    type='number'
                                    value={pages}
                                    onChange={e => setPages(e.target.value)}
                                ></input>
                            </div>
                        </div>
                    </div>
                    {errorNotif && (
                        <ul className='auth__container--errors'>
                            <li>Something seems to be missing. Check above to see what went wrong.</li>
                        </ul>
                    )}
                    <div className='form__buttons'>
                        <button
                            // disabled={!title || !author || !language}
                            className='button' type='submit'>Submit</button>
                        {formType === 'createNew' && (
                            <>
                                <hr />
                                <button
                                    disabled={!(title || author || synopsis || imageUrl || isbn13 || originalTitle || language || publicationYear || pages)}
                                    className='button' type='reset'>Reset</button>
                            </>
                        )}
                    </div>
                </form>
            </div >
        </>
    )
}

export default BookForm;
