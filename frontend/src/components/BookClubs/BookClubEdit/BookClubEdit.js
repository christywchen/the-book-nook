import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BookClubForm from '../../Forms/BookClubForm/BookClubForm';
import { useEffect } from 'react';
import { getBookClub } from '../../../store/book_club';

function BookClubEdit() {
    const formType = 'editRecord';
    const { id } = useParams();
    const dispatch = useDispatch();
    const bookClub = useSelector(state => state.bookClub.byId[id]);

    useEffect(() => {
        dispatch(getBookClub(id));
    }, [dispatch]);

    let formProps;
    if (bookClub) {
        formProps = {
            name: bookClub.name,
            description: bookClub.description,
            image_url: bookClub.image_url,
            capacity: bookClub.capacity
        }
    }

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Edit Book Club</div>

                <BookClubForm formType={formType} formProps={formProps} />

            </div>
        </>
    )
}

export default BookClubEdit;
