import { useState } from 'react';

import './SearchBooks.css';

function SearchBooks() {
    const [query, setQuery] = useState('');

    async function handleSubmit(e) {
        e.preventDefault()
        console.log('send search')
    }

    async function handleQuery(e) {
        setQuery(e.target.value);
        console.log('query a thing')
    }

    return (
        <>
            <form id='search__form' onSubmit={handleSubmit}>
                {/* <div id='search__form'> */}
                <label form='search'>
                    <input
                        name='search'
                        type='text'
                        value={query}
                        placeholder='Search books...'
                        onChange={handleQuery} />
                </label>
                <span>
                    <button type='submit'>Search</button>
                </span>
                {/* </div> */}
            </form>
        </>
    )
}

export default SearchBooks;
