import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const onDemo = async (e) => {
    e.preventDefault();
    setEmail("demo@aa.io");
    setPassword("password");

    const data = await dispatch(login(email, password));
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }
  return (
    <div className="loginSignupContainer">
      <div className="loginSignupLeft leftAndRight">
        <div className="loginSignupBody">
          <h2>Login to Yap</h2>
          <div>New to Yap? <a href="/signup">Sign up</a></div>
          <button className="button" onClick={onDemo}>
            Continue With Demo
          </button>
          <div><span>OR</span></div>
          <form onSubmit={onLogin}>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className="loginSignupInputRow">
              <input
                name='email'
                type='email'
                placeholder='Email'
                value={email}
                onChange={updateEmail}
                required
                className="emailField"
              />
            </div>
            <div className="loginSignupInputRow">
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                className="passwordField"
                required
              />
            </div>
            <button type='submit' className="loginSignupbutton redButton button">Log In</button>
            <div>New to Yap? <a href="/signup">Sign up</a></div>
          </form>
        </div>
      </div>
      <div className="loginSignupRight leftAndRight">
        <div className="loginSignupImageContainer">
          {/* <img src="" /> */}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
