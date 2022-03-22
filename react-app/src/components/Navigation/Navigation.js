
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../Auth/LogoutButton';

import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

import './Navigation.css';
import SearchBooks from '../Forms/SearchBooks/SearchBooks';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id="nav__container">
      <div id="nav__title">
        <NavLink to='/' exact={true} activeClassName='active'>
          The Book Nook
        </NavLink>
      </div>
      <DesktopNav />
      <MobileNav />
    </nav >
  );
}

export default Navigation;
