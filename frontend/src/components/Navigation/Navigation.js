
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="nav__container">
      <div id="nav__title">
        The Book Nook
      </div>
      <div id="nav__links">
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
        <NavLink to='/about' exact={true} activeClassName='active'>
          About
        </NavLink>
        {sessionUser && (<NavLink to='/dashboard' exact={true} activeClassName='active'>
          My Book Clubs
        </NavLink>)}
        {!sessionUser && (
          <>
            <NavLink to='/signup' exact={true} activeClassName='active'>
              Get Started
            </NavLink>
            <NavLink to='/login' exact={true} activeClassName='active'>
              Log In
            </NavLink>
          </>
        )}
        {/* <NavLink to='/users' exact={true} activeClassName='active'>
          Users
        </NavLink> */}
        {sessionUser && (<LogoutButton />)}
      </div>
    </nav>
  );
}

export default Navigation;
