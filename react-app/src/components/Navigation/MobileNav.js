import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LogoutButton from '../Auth/LogoutButton';
import SearchBooks from '../Forms/SearchBooks/SearchBooks';

import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';

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
                        <>
                            <NavLink className='nav__mainlink' to='/about' exact={true} activeClassName='active'>
                                About
                            </NavLink>
                            <NavLink className='nav__mainlink' to='/signup' exact={true} activeClassName='active'>
                                Get Started
                            </NavLink>
                            <NavLink className='nav__mainlink' to='/login' exact={true} activeClassName='active'>
                                Log In
                            </NavLink>
                        </>
                    )}
                    <div className='nav__social'>
                        <a href='https://github.com/christywchen/' target="_blank" rel="noreferrer noopener">
                            <img className='social__icon' alt='Github' src={github} />
                        </a>
                        <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">
                            <img className='social__icon' alt='LinkedIn' src={linkedin} />
                        </a>
                    </div>
                    {sessionUser && (
                        <>
                            <div className='nav__menu--button-mobile'>
                                <i class="fa-solid fa-bars fa-xl" onClick={handleMenu}></i>
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
                                            <LogoutButton />
                                        </li>
                                        <hr className='mobile__divider' />
                                        <li className='mobile__social'>
                                            <a href='https://github.com/christywchen/' target="_blank" rel="noreferrer noopener">
                                                <img className='social__icon' alt='Github' src={github} />
                                            </a>
                                            <a href='https://www.linkedin.com/in/christy-chen/' target="_blank" rel="noreferrer noopener">
                                                <img className='social__icon' alt='LinkedIn' src={linkedin} />
                                            </a>
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
