import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useParams, useHistory } from 'react-router-dom';
import "./user.css";
import userIcon from "../../images/user_24dp.svg";
import userPhoto from "../../images/photo_camera_black_24dp.svg";
import userReview from "../../images/review_black_24dp.svg";
import addPhoto from "../../images/add_a_photo_black_24dp.svg";
import updateProfile from "../../images/article_black_24dp.svg";

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
                  <div>
                    <h1>{sessionUser?.fname} {sessionUser?.lname[0]}.</h1>
                    <div>STATS GO HERE</div>
                  </div>
                </div>
                <div className="profileActionLinks">
                  <div className="profileActionLinkItem">
                    <Link to="/user/photos/add"><span className="buttonIconMini" style={{backgroundImage: `url(${addPhoto})`}}></span>Add Profile Photos</Link>
                  </div>
                  <div className="profileActionLinkItem">
                    <Link><span className="buttonIconMini" style={{backgroundImage: `url(${updateProfile})`}}></span>Update Your Profile</Link>
                  </div>
                  {/* <div>
                    <Link></Link>
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
              <li className="profileSideItem"><NavLink to="/user" activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userIcon})`}}></span>Profile Overview</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/reviews" activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userReview})`}}></span>Reviews</NavLink></li>
              <li className="profileSideItem"><NavLink to="/user/businessPhotos" activeClassName="sideBarActive"><span className="buttonIcon"style={{backgroundImage: `url(${userPhoto})`}}></span>Business Photos</NavLink></li>
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
                  <div>
                    <h1>{user?.fname} {user?.lname?.slice(0,1)}.</h1>
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
              <li className="profileSideItem"><NavLink to={`/users/${userId}`} activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userIcon})`}}></span>Profile Overview</NavLink></li>
              <li className="profileSideItem"><NavLink to={`/users/${userId}/reviews`} activeClassName="sideBarActive"><span className="buttonIcon" style={{backgroundImage: `url(${userReview})`}}></span>Reviews</NavLink></li>
              <li className="profileSideItem"><NavLink to={`/users/${userId}/businessPhotos`} activeClassName="sideBarActive"><span className="buttonIcon"style={{backgroundImage: `url(${userPhoto})`}}></span>Business Photos</NavLink></li>
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
