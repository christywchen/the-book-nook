import { Route, Switch, Redirect, useParams } from 'react-router-dom';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';
import ReadingList from './ReadingList/ReadingList';

import './Dashboard.css';

function Dashboard() {
    const { id } = useParams();

    console.log('DASDHBOSJLSDKFJARD', id)
    return (
        <>
            <Switch>
                <Route path='/dashboard/book-clubs/:id' exact={true}>
                    {/* <Redirect to='/dashboard/book-clubs/:bookClubId/reading-list' /> */}
                </Route>
                <Route path='/dashboard/book-clubs/:id/reading-list'>
                    <ReadingList />
                    <DetailsBar />
                </Route>
                <Route path='/dashboard/book-clubs/:id/rooms/:chatType'>
                    <Chatroom />
                    <DetailsBar />
                </Route>
            </Switch>
        </>
    )
}

export default Dashboard;
