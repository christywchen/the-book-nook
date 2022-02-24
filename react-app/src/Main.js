import { Route, Switch, Redirect } from 'react-router-dom';

import ProtectedRoute from './components/Auth/ProtectedRoute';
import Sidebar from './components/Sidebar/Sidebar';
import Dashboard from './components/Dashboard/Dashboard';
import BookClubs from './components/BookClubs/BookClubs';
import Books from './components/Books/Books';
import Chat from './components/Chat';

import './App.css';

function Main() {
    return (
        <>
            <div id="content__container">
                <Sidebar />
                <Switch>
                    <ProtectedRoute path='/dashboard*' exact={true} >
                        <Dashboard />
                    </ProtectedRoute>
                    <ProtectedRoute path='/book-clubs*' exact={true} >
                        <BookClubs />
                    </ProtectedRoute>
                    <ProtectedRoute path='/books*' exact={true} >
                        <Books />
                    </ProtectedRoute>
                    {/* <ProtectedRoute path='/users/:userId' exact={true} >
                        <User />
                    </ProtectedRoute> */}
                    <ProtectedRoute path='/chat' exact={true} >
                        <Chat />
                    </ProtectedRoute>
                    <Route path="/*">
                        <Redirect to='/not-found' />
                    </Route>
                </Switch>
            </div>
        </>
    )
}

export default Main;
