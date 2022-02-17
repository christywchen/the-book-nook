import { Route, Switch } from 'react-router-dom';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';

function Main() {
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
