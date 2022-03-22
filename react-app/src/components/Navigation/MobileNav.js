import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from '../Auth/LogoutButton';
import SearchBooks from '../Forms/SearchBooks/SearchBooks';

function TabletNav() {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    async function handleMenu() {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <div id='nav__mobile' className='nav__links--mobile'>
                <div className='nav__menu--mobile'>
                    {!sessionUser && (
                        <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active'>
                            About
                        </NavLink>
                    )}
                    {sessionUser && (
                        <>
                            <div className='nav__menu--button-mobile'>
                                <i class="fa-solid fa-bars fa-xl" onClick={handleMenu}></i>
                            </div>
                            {sessionUser && showMenu && (
                                <>
                                    <ul id="nav__menu--links-mobile">
                                        <li>
                                            <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active'>
                                                About
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <NavLink className='nav__mainlink' to='/dashboard' exact={true} activeClassName='active'>
                                                My Book Clubs
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <span className='nav__text--heavy'>Explore</span>
                                        </li>
                                        <li>
                                            <NavLink className='nav__mainlink' to='/book-clubs/all' exact={true} activeClassName='active'>
                                                Book Clubs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='nav__mainlink' to='/books/all' exact={true} activeClassName='active'>
                                                Books
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <SearchBooks />
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <LogoutButton />
                                        </li>
                                    </ul>
                                </>
                            )}
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
                </div>


                {/* <div id='nav__right'>
          <div className='nav__social'>
            <a href='https://github.com/christywchen/' target="_blank" rel="noreferrer noopener">
              <img className='social__icon' alt='Github' src={github} />
            </a>
            <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">
              <img className='social__icon' alt='LinkedIn' src={linkedin} />
            </a>
          </div>
        </div> */}
            </div>
        </>
    )
}

export default TabletNav;