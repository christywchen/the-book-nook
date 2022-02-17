import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Navigation from './components/Navigation/Navigation';
import BookClubList from './components/BookClubs/BookClubList/BookClubList';
import User from './components/User';
import Main from './components/Main/Main';
import Chat from './components/Chat';

import { authenticate } from './store/session';

import Sidebar from './components/Sidebar/Sidebar';

import './App.css';
import About from './components/About/About';
import Home from './components/Home/Home';
import { getAllBookClubs } from './store/book_club';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Navigation />
      {/* <div id="body__container"> */}
      <Switch>
        <Route path='/' exact={true}>
          <Home />
        </Route>
        <Route path='/about' exact={true}>
          <About />
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/signup' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <div id="content__container">
          <Sidebar />
          <ProtectedRoute path='/dashboard/*' exact={true} >
            <Main />
          </ProtectedRoute>
          <ProtectedRoute path='/book-clubs' exact={true} >
            <BookClubList />
          </ProtectedRoute>
          {/* <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute> */}
          {/* <ProtectedRoute path='/*' exact={true} >
            <Main />
          </ProtectedRoute> */}
          <ProtectedRoute path='/chat' exact={true} >
            <Chat />
          </ProtectedRoute>
        </div>
      </Switch>
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
