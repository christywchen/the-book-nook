import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllBooks } from '../../../store/book';
import { getBookClubBooks, getAllBookClubBooks } from '../../../store/book_club_book';

import ReadingListCard from './ReadingListCard/ReadingListCard';

function ReadingList() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBooksObj = useSelector(state => state.book.byId);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getAllBookClubBooks(id))
        dispatch(getAllBooks());
    }, [dispatch, id]);

    // get all books club book records for this book club by filtering
    // and then map them into book records
    let bookClubBooks;
    if (allBookClubBooks && allBooksObj) {
        console.log(allBookClubBooks, 'BOOK CLUB BOOKS')
        console.log(allBooksObj[1])
        bookClubBooks = allBookClubBooks.reduce((books, bookClubBook) => {
            if (bookClubBook.book_club_id === parseInt(id, 10)) {
                const bookId = bookClubBook['book_id'];
                books.push(allBooksObj[bookId]);
            }
            return books;
        }, []);
    }

    return (
        <>
            <div id="center__container">
                <h3>
                    Reading List
                </h3>

                {bookClubBooks.length > 0 ? bookClubBooks.map(book => (
                    <>
                        <ReadingListCard book={book} />
                    </>
                )) : <>Nothing</>}
            </div>
        </>
    )
}

export default ReadingList;
