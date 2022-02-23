import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBooks } from '../../../store/book';

import ReadingListCard from '../ReadingListCard/ReadingListCard';
import './DashboardCard.css';

function DashboardCard({ bookClub, allBooksObj, allBookClubBooks }) {


    // get book club books for the book club
    // get the book object in order to return details about the book
    let bookClubBooks;
    if (allBookClubBooks && allBooksObj) {
        bookClubBooks = allBookClubBooks.reduce((books, bookClubBook) => {
            if (bookClubBook.book_club_id === parseInt(bookClub?.id, 10)) {
                const bookId = bookClubBook['book_id'];
                books.push([allBooksObj[bookId], bookClubBook]);
            }
            return books;
        }, []);
    }

    return (
        <>
            <div className='dash__card--subtitle'>
                {bookClub?.name}
            </div>
            <div className='readinglist__card--container dash__card--books'>
                {bookClubBooks.length > 0 ? bookClubBooks.map(book => (
                    <div key={book?.id}>
                        <ReadingListCard bookInfo={book} />
                    </div>
                )) : <>No books at the moment. Maybe you could add some to this book club's reading list?</>}
            </div>
        </>
    )
}

export default DashboardCard;
