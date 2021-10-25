import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from "../../../store/review";
import "./newReview.css";
// import { getBusiness } from '../../store/business';
import { useParams, NavLink } from 'react-router-dom';
import defaultAvatar from "../../../images/default_user_avatar_64x64.png"

function NewReview({sessionUser, businessId}) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [starRatingVal, setStarRatingVal] = useState();
  const [reviewText, setReviewText] = useState();
  const reviewTextPlaceholder = "Woof woof, arf, aroo!"

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM HIT")
    console.log("userId", sessionUser.id, "businessId", businessId, "starRating", starRatingVal, "review", reviewText)
    if(starRatingVal && reviewText) {
      const formData = new FormData();

      formData.append("userId", sessionUser.id);
      formData.append("businessId", businessId);
      formData.append("rating", starRatingVal);
      formData.append("review", reviewText);
      const data = await dispatch(newReview(formData));
      if (data) {
        setErrors(data);
      }
    }
  }
  console.log(starRatingVal)
  console.log(reviewText)

  return(
    <div className="newReview">
      <div className="newReviewTop">
        <div className="newReviewAvatarContainer">
          {(sessionUser ? (
            <a href="" className="newReviewAvatarLink">
              <img src={sessionUser?.avatar} alt="New Review Avatar" className="newReviewAvatar" draggable="False" />
            </a>
          ) : (
            <div className="newReviewAvatarLink">
              <img src={defaultAvatar} alt="New Review Avatar" className="newReviewAvatar" draggable="False" />
            </div>
          ))}
        </div>
        <div className="newReviewInfoBox">
          <div className="newReviewName">
            {(sessionUser ? (
              <a href="">
                {sessionUser?.fname} {sessionUser?.lname[0]}.
              </a>
            ) : (
              <>Username</>
            ))}
          </div>
          <div>{/* Location */}</div>
          <div>{/* Badges */}
            <div>{/* Friends */}</div>
            <div>{/* Revies */}</div>
            <div>{/* Images */}</div>
          </div>
        </div>
      </div>
      <div className="newReviewBottom">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="starRatingButtons">
              <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="1" name="starRating">

              </input>
              <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="2" name="starRating">

              </input>
              <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="3" name="starRating">

              </input>
              <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="4" name="starRating">

              </input>
              <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="5" name="starRating">

              </input>
            </div>
            <div className="starRatingDisplay">
              <div></div>
              {/* <div className="">{ratingText}</div> */}
            </div>
          </div>
          <textarea className="newReviewText" onChange={(e) => setReviewText(e.target.value)} placeholder={reviewTextPlaceholder}>

          </textarea>
          <div>
            {/* Errors go here */}
          </div>
          <button type="submit" className="redButton businessButton bodyButton button">
            Post review
          </button>
        </form>
      </div>
    </div>
  )
}
export default NewReview;
