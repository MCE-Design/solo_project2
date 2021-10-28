import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from "../../../store/review";
// import "./newReview.css";
// import { getBusiness } from '../../store/business';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import defaultAvatar from "../../../images/default_user_avatar_64x64.png"
import "../photoUpload/photoupload.css"
import chevRight from "../../../images/chevron_right_black_24dp.svg"

function PhotoUpload({photoType}) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const id = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const [image, setImage] = useState(null);
  const [imageCaption, setImageCaption] = useState();
  const [imageLoading, setImageLoading] = useState(false);
  const [imageTypeId, setImageTypeId] = useState();

  useEffect(() => {
    if (photoType === "business") {
      setImageTypeId(id);
    } else if (photoType === "review") {

    } else if (photoType === "user") {
      setImageTypeId(sessionUser?.id);
    }
  }, [photoType, id, sessionUser?.id]);

  console.log("businessId", id);
  console.log("userId", sessionUser?.id);
  console.log("imageTypeId", imageTypeId);
  console.log("PhotoType", photoType);

  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageable_id", imageTypeId);
      formData.append("imageable_type", photoType);
      formData.append("imageCaption", imageCaption);

      setImageLoading(true); // Replace with better image loader

      const res = await fetch('/api/image', {
          method: "POST",
          body: formData,
      });
      if (res.ok) {
          await res.json();
          setImageLoading(false);
          history.push("/");
      }
      else {
          setImageLoading(false);
          console.log("error"); // Better error handling needed
      }
  }

  const updateImage = (e) => {
      const file = e.target.files[0];
      setImage(file);
  }
  if( photoType === "business"){
    console.log("business");
    return(
      <h1>Business Photo Uploads Goes here</h1>
    )
  } else if( photoType === "review"){
    console.log("review")
    return(
      <h1>Review Photo Uploads Goes here</h1>
    )
  } else if( photoType === "user"){
    return (
      <div className="photoMain backPageMain">
        <div className="contentContainer">
          <div className="photoStatus">
            {/* <div className="alert">
              Put status message here (such as deletion message)
            </div> */}
          </div>
          <div className="photoUploadTop backPageTop">
            <ul className="breadcrumb">
              <li>
                <NavLink to="/user">{sessionUser?.fname} {sessionUser?.lname[0]}.</NavLink>
              </li>
              <li>
                <span className="chevronRight icon"><img src={chevRight} alt="Breadcrumb divider"/></span>
                Profile photos
              </li>
            </ul>
            <h2>Add photos</h2>
          </div>
          <div className="photoUploadBottom">
            <div className="photoUploadContainer backPageLowerContainer">
              <div className="photoUploadBody">
                <h1>Upload your photos here</h1>
                <div className="hr">
                  <div className="or"></div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="uploadFormRow">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={updateImage}
                      className="inputContainer file"
                    />
                  </div>
                  <div className="uploadFormRow">
                    <textarea onChange={(e) => setImageCaption(e.target.value)} className="inputContainer"></textarea>
                  </div>
                  <div>
                    <button type="submit" className="redButton photoButton bodyButton button">Submit</button>
                  </div>
                </form>
                {(imageLoading)&& <p>Loading...</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default PhotoUpload;
