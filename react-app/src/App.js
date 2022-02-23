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
import Books from './components/Books/Books';
import BookClubs from './components/BookClubs/BookClubs';
// import User from './components/User';
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
