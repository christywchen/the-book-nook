import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getAllBooks } from '../../../store/book';
import { getBookClubBooks } from '../../../store/book_club_book';
import IconImage from '../IconImage/IconImage';

import ReadingListCard from '../ReadingListCard/ReadingListCard';

import './ReadingList.css';

function ReadingList() {
    const { bookClubId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const bookClub = useSelector(state => state.bookClub.byId[bookClubId]);
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBooksObj = useSelector(state => state.book.byId);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getBookClubBooks(bookClubId));
        dispatch(getAllBooks());
    }, [dispatch, bookClubId]);

    // get all books club book records for this book club by filtering
    // and then map them into book records
    let bookClubBooks;
    if (allBookClubBooks && allBooksObj) {
        bookClubBooks = allBookClubBooks.reduce((books, bookClubBook) => {
            if (bookClubBook.book_club_id === parseInt(bookClubId, 10)) {
                const bookId = bookClubBook['book_id'];
                books.push([allBooksObj[bookId], bookClubBook]);
            }
            return books;
        }, []);
    }


    if (!bookClub) {
        return (
            <section id="center__container">
                <div id='center__container--title'>Reading List Not Found</div>
                <div className='readinglist__card--container content__unavail'>
                    This book club does not exist.
                </div>
            </section>
        )
    }

    return (
        <>
            <section id="center__container">
                <div id='center__container--topbar'>
                    <IconImage bookClub={bookClub} />
                    <div id='center__container--title'>
                        {bookClub.name}
                    </div>
                    <div id='center__container--subtitle'>
                        Reading List
                    </div>
                    <div id='center__container--desc'>
                        {bookClub.host_id === sessionUser.id ?
                            'Update read status or remove books added by members.'
                            : 'Update read status or remove books you\'ve suggested.'
                        }
                    </div>
                </div>
                <div id='center__container--main-content' className='readinglist__content'>
                    <div className='readinglist__card--container'>
                        {bookClubBooks.length > 0 ? bookClubBooks.map(book => (
                            <>
                                <div key={book.id}>
                                    <ReadingListCard bookInfo={book} />
                                </div>
                            </>
                        )) : (
                            <div className='content__unavail'>
                                No books at the moment. Maybe you could add some to this book club's reading list?
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default ReadingList;
