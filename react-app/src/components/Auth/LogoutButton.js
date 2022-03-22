import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = ({ setShowMenu }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());

    if (setShowMenu) setShowMenu(false);
    return history.push('/');
  };

  return <Link className='nav__mainlink' to='/' onClick={onLogout}>Logout</Link>;
};

export default LogoutButton;
