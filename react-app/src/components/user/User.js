import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
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
    history.replace("/user");
  }

  if (!user) {
    return null;
  }
  if( profile === "self" ){
    return (
      <div className="userMain">
        <div className="topBox">
          <div className="topContent">
            <div className="profileContentContainer">
              <div className="userProfileAvatar">
                <NavLink to="/user_photos">
                  <img src={sessionUser?.avatar} className="profileAvatarImage" alt={`${sessionUser}'s Avatar`}></img>
                </NavLink>
              </div>
              <div className="topInfoContainer">
                <div className="profileSpacer"></div>
                <div className="profileInfo">
                  INFO GOES HERE
                  <div>
                    <h1>{sessionUser?.fname} {sessionUser?.lname[0]}</h1>
                    <div>STATS GO HERE</div>
                  </div>
                </div>
                <div className="profileActionLinks">
                  <div>
                    <Link to="/user/photos/add">Add Profile Photos</Link>
                  </div>
                  <div>
                    <Link>Update Your Profile</Link>
                  </div>
                  {/* <div>
                    <Link>TEST</Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContainer">
          <div className="profileLeft">
            <h3>{sessionUser?.fname}'s Profile</h3>
            <ul className="profileSidebar">
              <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive">Profile Overview</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive">Reviews</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/businessPhotos" activeClassName="sideBarActive">Business Photos</NavLink></li>
            </ul>
          </div>
          <div className="profielRight">

          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="userMain">
        <div className="topBox">
          <div className="topContent">
            <div className="profileContentContainer">
              <div className="userProfileAvatar">
                <NavLink to={`/user_photos/${userId}`}>
                  <img src={user?.avatar} className="profileAvatarImage" alt={`${user?.fname}'s Avatar`}></img>
                </NavLink>
              </div>
              <div className="topInfoContainer">
                <div className="profileSpacer"></div>
                <div className="profileInfo">
                  INFO GOES HERE
                  <div>
                    <h1>{sessionUser?.fname} {sessionUser?.lname[0]}</h1>
                    <div>STATS GO HERE</div>
                  </div>
                </div>
                <div className="profileActionLinks">

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mainContainer">
          <div className="profileLeft">
            <h3>{user?.fname} {user?.lname?.slice(0,1)}.</h3>
            <ul className="profileSidebar">
              <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive">Profile Overview</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive">Reviews</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/businessPhotos" activeClassName="sideBarActive">Business Photos</NavLink></li>
            </ul>
          </div>
          <div className="profielRight">

          </div>
        </div>
      </div>
    )
  }
}
export default User;
