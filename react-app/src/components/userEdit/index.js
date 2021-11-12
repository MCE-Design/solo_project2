import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import "../user/user.css";

function UserEdit() {
  const sessionUser = useSelector(state => state.session.user);
  const [firstName, setFirstname] = useState(sessionUser?.fname);
  const [lastName, setLastname] = useState(sessionUser?.lname);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT")
  }

  return (
    <div className="userMain userEdit">
      <div className="mainContainer">
        <div className="profileLeft">
          <div className="profileLeftHeader">
            <h3>{sessionUser?.fname} {sessionUser?.lname[0]}.’s Account Settings</h3>
          </div>
          <ul className="profileSidebar">
            <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive"><span className="buttonIcon"></span>Profile</NavLink></li>
            <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive"><span className="buttonIcon"></span>Password</NavLink></li>
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
            ></input>
            <label>Last Name</label>
            <span className="profileEditExplain">This field is required. Only your last initial will show on your profile.</span>
            <input
              type="text"
              name="lastname"
              value={lastName}
            ></input>
            <label>Nickname</label>
            <span className="profileEditExplain">The Big Dog, Cool Cat, The Party Animal</span>
            <input></input>
            <label>Your Headline</label>
            <span className="profileEditExplain">Taco Tuesday Aficionado, The Globetrotting Reviewer</span>
            <input type="text"></input>
            <label>Find Me In</label>
            <span className="profileEditExplain">Nob Hill, the newest brunch spot, a turtleneck</span>
            <input type="text"></input>
            <label>E-Mail</label>
            <span className="profileEditExplain"></span>
            <input type="email"></input>
            <button type="submit" className="bodyButton redButton button">Save Changes</button><Link to="/user">Cancel</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UserEdit;
