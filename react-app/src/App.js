import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import About from './components/About/About';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Sidebar from './components/Sidebar/Sidebar';

import BookClubList from './components/BookClubs/BookClubList/BookClubList';
import BookClubCreate from './components/BookClubs/BookClubCreate/BookClubCreate';
import BookClubEdit from './components/BookClubs/BookClubEdit/BookClubEdit';
import BookList from './components/Books/BookList/BookList';
import BookCreate from './components/Books/BookCreate/BookCreate';
import BookEdit from './components/Books/BookEdit/BookEdit';
import BookDetails from './components/Books/BookDetails/BookDetails';

import User from './components/User';
import Chat from './components/Chat';

import { authenticate } from './store/session';


import './App.css';

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

        <div id="content__container">
          <Sidebar />
          <ProtectedRoute path='/dashboard/*' exact={true} >
            <Dashboard />
          </ProtectedRoute>
          <ProtectedRoute path='/book-clubs' exact={true} >
            <Redirect to='/book-clubs/all' />
          </ProtectedRoute>
          <ProtectedRoute path='/book-clubs/all' exact={true} >
            <BookClubList />
          </ProtectedRoute>
          <ProtectedRoute path='/book-clubs/new' exact={true} >
            <BookClubCreate />
          </ProtectedRoute>
          <ProtectedRoute path={'/book-clubs/:id(\\d+)/edit'} exact={true} >
            <BookClubEdit />
          </ProtectedRoute>
          <ProtectedRoute path='/books' exact={true} >
            <Redirect to='/books/all' />
          </ProtectedRoute>
          <ProtectedRoute path='/books/all' exact={true} >
            <BookList />
          </ProtectedRoute>
          <ProtectedRoute path={'/books/:id(\\d+)'} exact={true} >
            <BookDetails />
          </ProtectedRoute>
          <ProtectedRoute path='/books/new' exact={true} >
            <BookCreate />
          </ProtectedRoute>
          <ProtectedRoute path={'/books/:id(\\d+)/edit'} exact={true} >
            <BookEdit />
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
