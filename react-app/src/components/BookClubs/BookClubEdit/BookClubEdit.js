import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import BookClubForm from '../../Forms/BookClubForm/BookClubForm';
import { useEffect } from 'react';
import { getAllBookClubs } from '../../../store/book_club';

function BookClubEdit() {
    const formType = 'editRecord';
    const { id } = useParams();
    const dispatch = useDispatch();
    const allBookClubsObj = useSelector(state => state.bookClub.byId);
    const bookClub = allBookClubsObj[id];

    useEffect(() => {
        dispatch(getAllBookClubs());
    }, [dispatch]);

    let formProps;
    if (bookClub) {
        formProps = {
            id: bookClub.id,
            name: bookClub.name,
            description: bookClub.description,
            host_id: bookClub.host_id,
            image_url: bookClub.image_url,
            capacity: bookClub.capacity
        };
    }

    return (
        <>
            <div id='wide__container'>
                <div id='wide__title'>Edit Book Club</div>
                {bookClub && <BookClubForm formType={formType} formProps={formProps} />}
            </div>
        </>
    )
}

export default BookClubEdit;
