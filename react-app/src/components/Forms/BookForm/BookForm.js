import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { createBook, getAllBooks } from '../../../store/book';

function BookForm({ formType, formProps }) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [pages, setPages] = useState('');
    const [errors, setErrors] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();

        if (formType === 'createNew') {
            const data = await dispatch(createBook(title, author, synopsis, imageUrl, isbn13, originalTitle, language, publicationYear, pages));

            if (data.errors) {
                setErrors(data.errors);
            } else {
                const book = data;
                return history.push(`/books/all`)
            }
            console.log('HIIIII')
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
                                placeholder='Ex. 978-2-1234-5680-3'
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
                            disabled={!title || !author || !language}
                            className='button' type='submit'>Submit</button>
                        <hr />
                        <button
                            // disabled={!name || !capacity}
                            className='button' type='reset'>Reset</button>
                    </div>
                </form>
            </div >
        </>
    )
}

export default BookForm;
