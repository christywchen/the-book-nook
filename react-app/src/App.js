import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import LoginForm from './components/Auth/LoginForm';
import SignUpForm from './components/Auth/SignUpForm';

import About from './components/About/About';
import Home from './components/Home/Home';
import Navigation from './components/Navigation/Navigation';

import { authenticate } from './store/session';

import './App.css';
import NoMatch from './components/NoMatch/NoMatch';
import Main from './Main';

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
        <Route path="/not-found">
          <NoMatch />
        </Route>
        <Route path='/*' exact={true}>
          <Main />
        </Route>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
