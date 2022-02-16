import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogout = async (e) => {
    e.preventDefault();
    await dispatch(logout());

    return history.push('/');
  };

  return <Link onClick={onLogout}>Logout</Link>;
};

export default LogoutButton;
