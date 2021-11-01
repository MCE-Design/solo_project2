import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import "./auth.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, firstname, lastname, email, password));
      if (data) {
        setErrors(data)
      }
    } else {
      setErrors(["Password fields must match."])
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className="loginSignupContainer">
      <div className="loginSignupLeft leftAndRight">
        <div className="loginSignupBody">
          <h2>Sign Up for Yap</h2>
          <form onSubmit={onSignUp}>
          <div>
            {errors?.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
            {console.log(errors)}
          </div>
          <div className="loginSignupInputRow">
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              placeholder='username'
              value={username}
              required
            ></input>
          </div>
          <div className="loginSignupInputRow">
            <input
              type='text'
              name='firstname'
              onChange={updateFirstname}
              placeholder='first name'
              value={firstname}
              required
            ></input>
          </div>
          <div className="loginSignupInputRow">
            <input
              type='text'
              name='lastname'
              onChange={updateLastname}
              placeholder='last name'
              value={lastname}
              required
            ></input>
          </div>
          <div className="loginSignupInputRow">
            <input
              type='email'
              name='email'
              placeholder='Email'
              onChange={updateEmail}
              value={email}
              required
            ></input>
          </div>
          <div className="loginSignupInputRow">
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
              required
            ></input>
          </div>
          <div className="loginSignupInputRow">
            <input
              type='password'
              name='repeat_password'
              placeholder='Repeat Password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type='submit' className="loginSignupbutton redButton button">Sign Up</button>
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

export default SignUpForm;
