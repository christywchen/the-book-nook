import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';

import { getAllBookClubs } from '../../store/book_club';

function Main() {
    const dispatch = useDispatch();
    const allBookClubsObj = useSelector(state => state.bookClub.byId);

    useEffect(() => {
        dispatch(getAllBookClubs());
    }, [dispatch]);

    return (
        <>
            <Switch>
                <Route path='/dashboard/book-clubs/:bookClubId/rooms/:chatType'>
                    <Chatroom />
                    <DetailsBar />
                </Route>
            </Switch>
        </>
    )
}

export default Main;
