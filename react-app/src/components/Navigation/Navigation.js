import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import './Navigation.css';

const Navigation = () => {
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
