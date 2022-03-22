import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from '../Auth/LogoutButton';
import SearchBooks from '../Forms/SearchBooks/SearchBooks';

import SocialLinks from './SocialLinks';

function TabletNav() {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);

    async function handleMenu() {
        setShowMenu(!showMenu);
    }

    console.log('menu stat', showMenu)

    return (
        <>
            <div id='nav__mobile' className='nav__links--mobile'>
                <div className='nav__menu--mobile'>
                    {!sessionUser && (
                        <>
                            <div className='nav__menu--tab'>
                                <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active'>
                                    About
                                </NavLink>
                                <NavLink className='nav__mainlink' to='/signup' exact={true} activeClassName='active'>
                                    Get Started
                                </NavLink>
                                <NavLink className='nav__mainlink' to='/login' exact={true} activeClassName='active'>
                                    Log In
                                </NavLink>
                            </div>
                        </>
                    )}
                    <div className='nav__social'>
                        <SocialLinks />
                    </div>

                    {!sessionUser && (
                        <>
                            <div className='nav__menu--button-mobile home__menu--mobile'>
                                <i className="fa-solid fa-bars fa-xl" onClick={handleMenu}></i>
                            </div>
                            {showMenu && (
                                <>
                                    <ul id="nav__menu--links-mobile">
                                        <li>
                                            <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active' onClick={handleMenu}>
                                                About
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <NavLink className='nav__mainlink' to='/signup' exact={true} activeClassName='active' onClick={handleMenu}>
                                                Get Started
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <NavLink className='nav__mainlink' to='/login' exact={true} activeClassName='active' onClick={handleMenu}>
                                                Log In
                                            </NavLink>
                                        </li>
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                    {sessionUser && (
                        <>
                            <div className='nav__menu--button-mobile'>
                                <i className="fa-solid fa-bars fa-xl" onClick={handleMenu}></i>
                            </div>
                            {sessionUser && showMenu && (
                                <>
                                    <ul id="nav__menu--links-mobile">
                                        <li>
                                            <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active' onClick={handleMenu}>
                                                About
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <NavLink className='nav__mainlink' to='/dashboard' exact={true} activeClassName='active' onClick={handleMenu}>
                                                My Book Clubs
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <span className='nav__text--heavy'>Explore</span>
                                        </li>
                                        <li>
                                            <NavLink className='nav__mainlink' to='/book-clubs/all' exact={true} activeClassName='active' onClick={handleMenu}>
                                                Book Clubs
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink className='nav__mainlink' to='/books/all' exact={true} activeClassName='active' onClick={handleMenu}>
                                                Books
                                            </NavLink>
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <SearchBooks setShowMenu={setShowMenu} />
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li>
                                            <LogoutButton setShowMenu={setShowMenu} />
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li className='mobile__social'>
                                            <SocialLinks onClick={handleMenu} />
                                        </li>
                                    </ul>
                                </>
                            )}
                        </>
                    )}
                </div>

            </div>
        </>
    )
}

export default TabletNav;
