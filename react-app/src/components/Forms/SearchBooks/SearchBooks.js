import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './SearchBooks.css';

import { buildURLParams } from '../../../utils';

function SearchBooks() {
    const history = useHistory();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (query === '') {
            console.log('here')
            return history.push(`/books/all`);
        }
        const params = buildURLParams(query);
        setResults([]);
        setQuery('');
        setShowResults(false);

        return history.push(`/books/search/q?${params}`);
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
            setResults(data.books);
        }
    }

    async function handleClick(id) {
        setQuery('');
        setResults([]);
        setShowResults(false);
        return history.push(`/books/${id}`)
    }

    return (
        <>
            <div
                id='search__container'
                onFocus={() => setShowResults(true)}
                onBlur={() => setShowResults(false)}>
                <form id='search__form' onSubmit={handleSubmit}>
                    <label form='search'>
                        <input
                            name='search'
                            type='text'
                            value={query}
                            placeholder='Search books...'
                            onChange={handleQuery}
                        />
                    </label>
                    <span>
                        <button className='search__button' type='submit'><i className="fa-solid fa-magnifying-glass"></i></button>
                    </span>
                    {results.length > 0 && showResults && (
                        <div className='search__res'>
                            <ul>
                                {results.map(book => (
                                    <li key={book.id} onMouseDown={() => handleClick(book.id)}>
                                        <div className='res__info'>
                                            <div className='res__title'>
                                                {book.title}
                                            </div>
                                            <div className='res__author'>
                                                by {book.author}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                                <li>
                                    <div className='res__info res__more' onMouseDown={handleSubmit}>
                                        See all search results
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </form>
            </div >
        </>
    )
}

export default SearchBooks;
