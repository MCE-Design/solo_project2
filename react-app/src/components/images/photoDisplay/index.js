import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { getUserImagesUser } from "../../../store/image";
import { getBusinessImages } from "../../../store/image"
import { getBusiness } from '../../../store/business';
import "./photoDisplay.css";
import chevRight from "../../../images/chevron_right_black_24dp.svg"
import addPhoto from "../../../images/add_a_photo_white_24dp.svg"
import PhotoTile from '../../images/photoTiler';

function PhotoDisplay({ profile }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState({});
  const { id }  = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const business = useSelector(state => state.business.business);
  const images = useSelector(state => state.image?.image?.images);
  const businessImages = useSelector(state => state.image?.businessImage?.images);

  console.log("profile", profile)

  if (sessionUser?.id === +id && (profile === "self" || profile === "other")) {
    history.replace("/user_photos");
  }

  useEffect(() => {
    if( profile === "self") {
      console.log("GET IMAGES OF SELF")
      dispatch(getUserImagesUser(sessionUser?.id));
    } else if( profile === "business") {
      console.log("GET IMAGES OF BUSINESS");
      dispatch(getBusinessImages(id));
    } else {
      console.log("GET IMAGES OF OTHER")
      dispatch(getUserImagesUser(id));
    }
  }, [dispatch, profile, sessionUser?.id, id]);

  useEffect(() => {
    if( profile === "business") {
      dispatch(getBusiness(id));
    }
  }, [dispatch])


  if (!user || (sessionUser?.id === +id && profile === "other")) {
    return null;
  }
  if (profile === "self"){
    return (
      <div className="userPhotoMain backPageMain">
        <div className="contentContainer">
          <div className="userPhotoTop backPageTop">
            <div className="userPhotoLeft backPageLeft">
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
            <div className="userPhotoRight backPageRight">
              <NavLink to="/user/photos/add" className="redButton backPageButton bodyButton button">
                <span className="buttonIcon" style={{backgroundImage: `url(${addPhoto})`}}></span>
                Add photos
              </NavLink>
            </div>
          </div>
          <div className="backPageLowerContainer">
            <ul className="backPageImageContainer">
              {console.log("Image", images)}
              {images?.map((image) => {
                return(
                <li key={image?.id} className="imageTileContainer">
                  {console.log("HIT MAP")}
                  <PhotoTile image={image} user={sessionUser}/>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  } else if (profile === "business"){
    return (
      <div className="userPhotoMain backPageMain">
        <div className="contentContainer">
          <div className="userPhotoTop backPageTop">
            <h1>Photos for {business?.name}</h1>
          </div>
          <div className="backPageLowerContainer">
            <ul className="backPageImageContainer">
              {console.log("Business Image", businessImages)}
              {businessImages?.map((image) => {
                return(
                <li key={image?.id} className="imageTileContainer">
                  {console.log("HIT MAP")}
                  <PhotoTile image={image} user={sessionUser}/>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="userPhotoMain backPageMain">
        <div className="contentContainer">
          <div className="userPhotoTop backPageTop">
            <ul className="breadcrumb">
              <li>
                <NavLink to="/user">{user?.fname} {user?.lname[0]}.</NavLink>
              </li>
              <li>
                <span className="chevronRight icon"><img src={chevRight} alt="Breadcrumb divider"/></span>
                Profile photos
              </li>
            </ul>
            <h2>Your photos</h2>
          </div>
          <div className="backPageLowerContainer">
            <ul className="backPageImageContainer">
              {console.log("Image", images)}
              {images?.map((image) => {
                return(
                <li key={image?.id} className="imageTileContainer">
                  {console.log("HIT MAP")}
                  <PhotoTile image={image} user={sessionUser}/>
                </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default PhotoDisplay;
