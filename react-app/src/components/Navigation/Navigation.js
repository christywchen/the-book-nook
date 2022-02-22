
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="nav__container">
      <div id="nav__title">
        <NavLink to='/' exact={true} activeClassName='active'>
          The Book Nook
        </NavLink>
      </div>
      <div id="nav__links">
        <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active'>
          About
        </NavLink>
        {sessionUser && (
          <>
            <NavLink className='nav__mainlink' to='/dashboard' exact={true} activeClassName='active'>
              My Book Clubs
            </NavLink>
            <span className='nav__text'>
              <span className='nav__text--heavy'>Explore:</span>
              <NavLink className='nav__sublink' to='/book-clubs/all' exact={true} activeClassName='active'>
                Book Clubs
              </NavLink>
              <span className='nav__text--light'>//</span>
              <NavLink className='nav__sublink' to='/books/all' exact={true} activeClassName='active'>
                Books
              </NavLink>
            </span>
          </>
        )}
        {!sessionUser && (
          <>
            <NavLink className='nav__mainlink' to='/signup' exact={true} activeClassName='active'>
              Get Started
            </NavLink>
            <NavLink className='nav__mainlink' to='/login' exact={true} activeClassName='active'>
              Log In
            </NavLink>
          </>
        )}
        {sessionUser && (<LogoutButton />)}
      </div>
      <div className='nav__social'>
        <a href='https://github.com/christywchen/' target="_blank" rel="noreferrer noopener">
          <img className='social__icon' alt='Github' src={github} />
        </a>
        <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">
          <img className='social__icon' alt='LinkedIn' src={linkedin} />
        </a>
      </div>
    </nav>
  );
}

export default Navigation;
