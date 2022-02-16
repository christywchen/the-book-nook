import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import UsersList from './components/UsersList';
import Navigation from './components/Navigation/Navigation';
import User from './components/User';
import Chat from './components/Chat';

import { authenticate } from './store/session';

import Sidebar from './components/Sidebar/Sidebar';

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
          <ProtectedRoute path='/users/:userId' exact={true} >
            <User />
          </ProtectedRoute>
          <ProtectedRoute path='/*' exact={true} >
            {/* <Main /> */}
          </ProtectedRoute>
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
