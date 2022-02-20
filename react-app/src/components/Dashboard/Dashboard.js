import { Route, Switch, Redirect } from 'react-router-dom';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';
import ReadingList from './ReadingList/ReadingList';

import './Dashboard.css';

function Dashboard() {
    return (
        <>
            <Switch>
                {/* <Route path='/dashboard/book-clubs/:bookClubId'>
                    <Redirect to='/dashboard/book-clubs/:bookClubId/reading-list' />
                </Route> */}
                <Route path='/dashboard/book-clubs/:bookClubId/reading-list'>
                    <ReadingList />
                    <DetailsBar />
                </Route>
                <Route path='/dashboard/book-clubs/:bookClubId/rooms/:chatType'>
                    <Chatroom />
                    <DetailsBar />
                </Route>
            </Switch>
        </>
    )
}

export default Dashboard;
