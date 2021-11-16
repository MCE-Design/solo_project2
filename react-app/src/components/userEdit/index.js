import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import "../user/user.css";

function UserEdit() {
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstname] = useState(sessionUser?.fname);
  const [lastName, setLastname] = useState(sessionUser?.lname);
  const [nickName, setNickName] = useState(sessionUser?.nickname);
  const [headline, setHeadline] = useState(sessionUser?.headline);
  const [findme, setFindme] = useState(sessionUser?.findme);
  const [email, setEmail] = useState(sessionUser?.email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const data = await dispatch(signUp(username, firstname, lastname, email, password));
    console.log("SUBMIT");
  }

  const updateFirstname = (e) => {
    setFirstname(e.target.value);
  };

  const updateLastname = (e) => {
    setLastname(e.target.value);
  };

  const updateNickname = (e) => {
    setNickName(e.target.value);
  };

  const updateHeadline = (e) => {
    setHeadline(e.target.value);
  };

  const updateFindme = (e) => {
    setFindme(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };


  return (
    <div className="userMain userEdit">
      <div className="mainContainer">
        <div className="profileLeft">
          <div className="profileLeftHeader">
            <h3>{sessionUser?.fname} {sessionUser?.lname[0]}.’s Account Settings</h3>
          </div>
          <ul className="profileSidebar">
            <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive">Profile</NavLink></li>
            <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive">Password</NavLink></li>
          </ul>
        </div>
        <div className="profileRight">
          <div className="profileRightHeader">
            <h2>Profile</h2>
          </div>
          <form onSubmit={handleSubmit} className="userEditForm">
            <label>First Name</label>
            <span className="profileEditExplain">This field is required</span>
            <input
              type="text"
              name="firstname"
              value={firstName}
              onChange={updateFirstname}
            ></input>
            <label>Last Name</label>
            <span className="profileEditExplain">This field is required. Only your last initial will show on your profile.</span>
            <input
              type="text"
              name="lastname"
              value={lastName}
              onChange={updateLastname}
            ></input>
            <label>Nickname</label>
            <span className="profileEditExplain">The Big Dog, Cool Cat, The Party Animal</span>
            <input
              type="text"
              name="nickname"
              value={nickName}
              onChange={updateNickname}
            ></input>
            <label>Your Headline</label>
            <span className="profileEditExplain">Taco Tuesday Aficionado, The Globetrotting Reviewer</span>
            <input
              type="text"
              name="headline"
              value={headline}
              onChange={updateHeadline}
            ></input>
            <label>Find Me In</label>
            <span className="profileEditExplain">Pawston, the newest brunch spot, a vest</span>
            <input
              type="text"
              name="findme"
              value={findme}
              onChange={updateFindme}
            ></input>
            <label>E-Mail</label>
            <span className="profileEditExplain"></span>
            <input
              type="email"
              name="email"
              value={email}
              onChange={updateEmail}
            ></input>
            <button type="submit" className="backPageButton bodyButton redButton button">Save Changes</button><Link to="/user">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserEdit;
