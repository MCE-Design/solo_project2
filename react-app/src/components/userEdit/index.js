import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import "./user.css";

function UserEdit() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className="userMain">
      <div className="mainContainer">
        <div className="profileLeft">
          <h3>{sessionUser?.fname}'s Profile</h3>
          <ul className="profileSidebar">
            <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userIcon})`}}></span>Profile Overview</NavLink></li>
            <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userReview})`}}></span>Reviews</NavLink></li>
            <li className="profileSideItem"><NavLink to="/user/businessPhotos" activeClassName="sideBarActive"><span className="buttonIcon"style={{backgroundImage: `url(${userPhoto})`}}></span>Business Photos</NavLink></li>
          </ul>
        </div>
        <div className="profileRight">

        </div>
      </div>
    </div>
  )
}

export default UserEdit;
