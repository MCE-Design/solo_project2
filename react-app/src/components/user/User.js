import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import "./user.css";

function User({ profile }) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);

  console.log("profile", profile)
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  if (sessionUser?.id === +userId) {
    history.push("/user");
  }

  if (!user) {
    return null;
  }
  if( profile === "self" ){
    return (
      <div className="userMain">
        <div className="topInfo">
          <div>
            <div className="userProfileAvatar">
              <NavLink to="/user_photos">
                <img src={sessionUser?.avatar} className="profileAvatarImage"></img>
              </NavLink>
            </div>
            <div className="">
              <div></div>
              <div className="profileInfo">

              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="mainContainer">
          <h1>{sessionUser?.fname} {sessionUser?.lname[0]}.</h1>
        </div>
      </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li>
            <strong>User Id</strong> {userId}
          </li>
          <li>
            <strong>Username</strong> {user.username}
          </li>
          <li>
            <strong>Email</strong> {user.email}
          </li>
        </ul>
      </div>
    )
  }
}
export default User;