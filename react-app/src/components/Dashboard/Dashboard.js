import { Route, Switch, Redirect } from 'react-router-dom';

import Chatroom from './Chatroom/Chatroom';
import DetailsBar from './DetailsBar/DetailsBar';
import ReadingList from './ReadingList/ReadingList';
import DashboardHome from './DashboardHome/DashboardHome';
import Details from './Details/Details';

import './Dashboard.css';

function Dashboard() {
    return (
        <>
            <Switch>
                <Route path='/dashboard' exact={true}>
                    <DashboardHome />
                </Route>
                <Route path='/dashboard/book-clubs/:bookClubId/info' exact={true}>
                    <Details />
                </Route>
                <Route path='/dashboard/book-clubs/:bookClubId/reading-list'>
                    <ReadingList />
                    <DetailsBar />
                </Route>
                <Route path='/dashboard/book-clubs/:bookClubId/chats/:chatroomId'>
                    <Chatroom />
                    <DetailsBar />
                </Route>
                <Route path="/dashboard/*">
                    <Redirect to='/not-found' />
                </Route>
            </Switch>
        </>
    )
}

export default Dashboard;
