import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from "../../../store/review";
// import "./newReview.css";
// import { getBusiness } from '../../store/business';
import { useParams, NavLink, useHistory } from 'react-router-dom';
import defaultAvatar from "../../../images/default_user_avatar_64x64.png"

function PhotoUpload() {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [imageType, setImageType] = useState(null);
  const [imageCaption, setImageCaption] = useState();
  const [imageLoading, setImageLoading] = useState(false);

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
          history.push("/images");
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
      <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={updateImage}
          />
          <input onChange={(e) => setImageCaption(e.target.value)}></input>
          <button type="submit">Submit</button>
          {(imageLoading)&& <p>Loading...</p>}
      </form>
  )
}
export default PhotoUpload;
