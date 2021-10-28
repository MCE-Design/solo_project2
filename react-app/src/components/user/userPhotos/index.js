import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getUserImagesUser } from "../../../store/image";
import "./../user.css";
import chevRight from "../../../images/chevron_right_black_24dp.svg"
import PhotoTile from '../../images/photoTiler';

function UserPhotos({ profile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { userId }  = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const images = useSelector(state => state.image?.image?.images)

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
    history.push("/user_photos");
  }

  useEffect(() => {
    if( profile === "self") {
      console.log("GET IMAGES OF SELF")
      dispatch(getUserImagesUser(sessionUser?.id));
    } else {
      console.log("GET IMAGES OF OTHER")
      dispatch(getUserImagesUser(userId));
    }
  }, [dispatch, profile, sessionUser?.id, userId]);

  if (!user) {
    return null;
  }
  return (
    <div className="userPhotoMain backPageMain">
      <div className="contentContainer">
        <div className="userPhotoTop backPageTop">
          <ul className="breadcrumb">
            <li>
              <NavLink to="/user">{sessionUser?.fname} {sessionUser?.lname[0]}.</NavLink>
            </li>
            <li>
              <span className="chevronRight icon"><img src={chevRight} alt="Breadcrumb divider"/></span>
              Profile photos
            </li>
          </ul>
          <h2>Your photos</h2>
        </div>
          <div className="backPageLowerContainer">
            <ul>{/* Map Images Here in repeated <li>*/}
              {console.log("Image", images)}
              {images?.map((image) => {
                return(
                <li key={image?.id} className="imageTileContainer">
                  {console.log("HIT MAP")}
                  <PhotoTile image={image}/>
                </li>
                )
              })}
            </ul>
          </div>
      </div>
    </div>
  )
}
export default UserPhotos;
