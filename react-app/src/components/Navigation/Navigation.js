import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

import './Navigation.css';

const Navigation = () => {
  return (
    <nav id="nav__container">
      <DesktopNav />
      <MobileNav />
    </nav >
  );
}

export default Navigation;
