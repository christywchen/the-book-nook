import { useState } from 'react';


function BookForm({ formType, formProps }) {
    const [errors, setErrors] = useState('');
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isbn13, setIsbn13] = useState('');
    const [originalTitle, setOriginalTitle] = useState('');
    const [language, setLanguage] = useState('');
    const [publicationYear, setPublicationYear] = useState('');
    const [pages, setPages] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
    }

    async function handleReset(e) {
        e.preventDefault();
    }

    return (
        <>
            <div id='form__container'>
                <form onSubmit={handleSubmit} onReset={handleReset}>
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
                            // disabled={!name || !capacity}
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
