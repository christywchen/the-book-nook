import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, useHistory } from 'react-router-dom';
import { signUp } from '../../store/session';
import { login } from '../../store/session';

const SignUpForm = () => {
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [passwordError, setPasswordError] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();

    // if (password === repeatPassword) {
    const data = await dispatch(signUp(username, email, password));
    if (data) {
      setErrors(data)

      if (password !== confirmPassword) {
        setPasswordError('Passwords must match.');
      } else {
        setPasswordError('');
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  }

  const updateLastName = (e) => {
    setLastName(e.target.value);
  }

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleDemo = (e) => {
    e.preventDefault();

    const credential = 'demo@aa.io';
    const password = 'password';

    return dispatch(login(credential, password))
      .catch(async (res) => {
        await res.json();
      });
  }

  const handleRedirect = (e) => {
    e.preventDefault();
    return history.push('/login');
  }

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <>
      <div id="auth__container">

        <div id='auth__container--title'>Join Us</div>
        <div id="auth__form">

          <form onSubmit={handleSignup}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
              {passwordError}
            </div>
            <div>
              <label>
                <input
                  name='username'
                  type='text'
                  placeholder='Username'
                  value={username}
                  onChange={updateUsername}
                ></input>
              </label>
            </div>
            <div>
              <label>
                <input
                  name='first_name'
                  type='text'
                  placeholder='First Name'
                  value={firstName}
                  onChange={updateFirstName}
                ></input>
              </label>
            </div>
            <div>
              <label>
                <input
                  name='last_name'
                  type='text'
                  placeholder='Last Name'
                  value={lastName}
                  onChange={updateLastName}
                ></input>
              </label>
            </div>
            <div>
              <label>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                ></input>
              </label>
            </div>
            <div>
              <label>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  onChange={updatePassword}
                  value={password}
                ></input>
              </label>
            </div>
            <div>
              <label>
                <input
                  name='confirm_password'
                  type='password'
                  placeholder='Confirm Password'
                  value={confirmPassword}
                  onChange={updateConfirmPassword}
                // required={true}
                ></input>
              </label>
            </div>
            <button className='button button__auth' type='submit'>Submit</button>
          </form>
          <form onSubmit={handleDemo}>
            <button className='button button__auth' type="submit">Demo User</button>
          </form>
          <form onSubmit={handleRedirect}>
            <button className='button button__auth button__modal' type="submit">Already have an account?</button>
          </form>
        </div>
      </div >
    </>
  );
};

export default SignUpForm;
