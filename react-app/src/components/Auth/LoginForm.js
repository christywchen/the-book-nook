import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { login } from '../../store/session';

import './Auth.css';

const LoginForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const handleDemo = (e) => {
    e.preventDefault();

    const credential = 'demo@demo.io';
    const password = 'password';

    return dispatch(login(credential, password))
      .catch(async (res) => {
        await res.json();
      });
  }

  const handleRedirect = (e) => {
    e.preventDefault();
    return history.push('/signup');
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <>
      <section id='auth__container'>

        <div id='auth__container--title'>Log In</div>
        <div id='auth__form'>

          <form onSubmit={handleLogin}>
            {errors.length > 0 &&
              (<ul className='auth__container--errors'>
                <li>
                  Login credentials invalid.
                </li>
              </ul>
              )}
            <div>
              <label htmlFor='email'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                />
              </label>
            </div>
            <div>
              <label htmlFor='password'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                />
              </label>
              <button
                disabled={!email || !password}
                className='button button__auth' type='submit'>Submit</button>
              <hr />
            </div>
          </form>
          <form onSubmit={handleDemo}>
            <button className='button button__auth' type='submit'>Demo User</button>
          </form>
          <form onSubmit={handleRedirect}>
            <button className='button button__auth button__modal' type='submit'>Don't have an account?</button>
          </form>
        </div>
      </section>
    </>
  );
};

export default LoginForm;
