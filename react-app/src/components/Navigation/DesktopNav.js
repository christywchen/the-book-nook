import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SearchBooks from '../Forms/SearchBooks/SearchBooks';
import LogoutButton from '../Auth/LogoutButton';

import github from '../../assets/github.svg';
import linkedin from '../../assets/linkedin.svg';
import SocialLinks from './SocialLinks';

function DesktopNav() {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            <div id='nav__desktop' className='nav__links--desktop'>
                <div id="nav__left">
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
                            <SearchBooks />
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
                <div id='nav__right'>
                    {sessionUser && (
                        <LogoutButton />
                    )}
                    <div className='nav__social'>
                        <SocialLinks />
                    </div>
                </div>
            </div>
        </>
    )
}

export default DesktopNav;
