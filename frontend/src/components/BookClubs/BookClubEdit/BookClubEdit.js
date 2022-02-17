import { useDispatch } from 'react-redux';
import BookClubForm from '../BookClubForm/BookClubForm';

function BookClubEdit() {
    const formType = 'editRecord';
    const dispatch = useDispatch();
    // const bookClub = useSelector(state => state.book_c)

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Edit Book Club</div>

                <BookClubForm formType={formType} />

            </div>
        </>
    )
}

export default BookClubEdit;
