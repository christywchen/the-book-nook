import { useState } from 'react';

import './SearchBooks.css';

function SearchBooks() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('send search')
    }

    async function handleQuery(e) {
        setQuery(e.target.value);

        if (e.target.value === '') {
            setResults([]);
            setShowResults(false);
            return;
        }

        const res = await fetch(`/api/search/books/${e.target.value}/5`);

        if (res.ok) {
            setShowResults(true);
            const data = await res.json();
            console.log(data.books)
            setResults(data.books);
        }


        // console.log('query a thing')
    }

    return (
        <>
            <form id='search__form' onSubmit={handleSubmit}>
                <label form='search'>
                    <input
                        name='search'
                        type='text'
                        value={query}
                        placeholder='Search books...'
                        onChange={handleQuery}
                        onFocus={e => setShowResults(true)}
                        onBlur={e => setShowResults(false)}
                    />
                </label>
                <span>
                    <button className='search__button' type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                </span>
                {results.length > 0 && showResults && (
                    <div className='search__res'>
                        <ul>
                            {results.map(book => (
                                <li key={book.id}>{book.title}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </form>
        </>
    )
}

export default SearchBooks;
