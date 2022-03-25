import { NavLink } from 'react-router-dom';

function NavLogo({ setShowMenu }) {
    async function handleMenu() {
        if (setShowMenu) setShowMenu(false);
    }

    return (
        <>
            <div id="nav__title">
                <NavLink to='/' exact={true} onClick={handleMenu} activeClassName='active'>
                    The Book Nook
                </NavLink>
            </div>
        </>
    )
}

export default NavLogo;
