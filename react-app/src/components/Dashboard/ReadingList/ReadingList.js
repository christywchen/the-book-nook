import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookClubBooks, getBookClubBooks } from '../../../store/book_club_book';

function ReadingList() {
    const dispatch = useDispatch();
    const allBookClubBooksObj = useSelector(state => state.bookClubBook.byId);
    const allBookClubBooks = Object.values(allBookClubBooksObj);

    useEffect(() => {
        dispatch(getBookClubBooks())
    }, [dispatch]);

    let bookClubBooks;
    if (allBookClubBooks) {

    }
    console.log(bookClubBooks)

    return (
        <>
            <div id="center__container">
                <h3>
                    Reading List
                </h3>

            </div>
        </>
    )
}

export default ReadingList;
