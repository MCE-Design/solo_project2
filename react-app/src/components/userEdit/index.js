import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import "../user/user.css";

function UserEdit() {
  const sessionUser = useSelector(state => state.session.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <div className="userMain">
      <div className="mainContainer">
        <div className="profileLeft">
          <h3>{sessionUser?.fname}'s Profile</h3>
          <ul className="profileSidebar">
            <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive"><span className="buttonIcon"></span>Profile</NavLink></li>
            <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive"><span className="buttonIcon"></span>Password</NavLink></li>
          </ul>
        </div>
        <div className="profileRight">
          <form onSubmit={handleSubmit}>
            <h4>First Name</h4>
            <label>This field is required</label>
            <input
              type="text"
              name="firstname"
            ></input>
            <h4>Last Name</h4>
            <label>This field is required. Only your last initial will show on your profile.</label>
            <input
              type="text"
              name="lastname"
            ></input>
            <h4>Nickname</h4>
            <label>The Boss, Calamity Jane, The Prolific Reviewer</label>
            <input></input>
            <h4>Your Headline</h4>
            <label>Taco Tuesday Aficionado, The Globetrotting Reviewer</label>
            <input></input>
            <h4>Find Me In</h4>
            <label>Nob Hill, the newest brunch spot, a turtleneck</label>
            <input></input>
            <h4>EMail</h4>
            <label></label>
            <input></input>
            <input type="submit"></input>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserEdit;
