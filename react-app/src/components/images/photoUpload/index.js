import React, { useState } from 'react';
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
  const [imageType, setImageType] = useState(null);
  const [imageCaption, setImageCaption] = useState();
  const [imageLoading, setImageLoading] = useState(false);

  console.log("PhotoType", photoType)
  // setImageType("business");
  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", image);
      formData.append("imageable_id", 3);
      formData.append("imageable_type", "business");
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

  return (
    <div className="photoMain">
      <div className="contentContainer">
        <div className="photoStatus">
          {/* <div className="alert">
            Put status message here (such as deletion message)
          </div> */}
        </div>
        <div className="photoUploadTop">
          <ul className="breadcrumb">
            <li>
              <NavLink to="/user">{sessionUser?.fname} {sessionUser?.lname[0]}.</NavLink>
            </li>
            <li>
              <span className="chevronRight icon"><img src={chevRight} alt="Breadcrumb divider"/></span>
              Profile Photos
            </li>
          </ul>
          <h2>Add Photos</h2>
        </div>
        <div className="photoUploadBottom">
          <div className="photoUploadContainer">
            <div className="photoUploadBody">
              <h1>Upload your photos here</h1>
              <div className="hr">
                <div></div>
              </div>
              <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                  />
                  <textarea onChange={(e) => setImageCaption(e.target.value)}></textarea>
                  <button type="submit" className="redButton photoButton bodyButton button">Submit</button>
                  {(imageLoading)&& <p>Loading...</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default PhotoUpload;
