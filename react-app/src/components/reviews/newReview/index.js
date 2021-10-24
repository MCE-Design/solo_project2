import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./newReview.css";
// import { getBusiness } from '../../store/business';
import { useParams, NavLink } from 'react-router-dom';

function NewReview({sessionUser}) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const [starRatingVal, setStarRatingVal] = useState();
  const [reveiewText, setReviewText] = useState();
  const reviewTextPlaceholder = "Woof woof, arf, aroo!"

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FORM HIT")

    if(starRatingVal) {
      const formData = new FormData();

      // const data = await dispatch(profileEdit(formData));
      // if (data) {
      //   setErrors(data);
      // }
    }
  }
  console.log(starRatingVal)
  console.log(reveiewText)

  return(
    <div className="newReview">
      <div className="newReviewTop">
        <div className="newReviewAvatarContainer">
          <a href="" className="newReviewAvatarLink">
            <img src={sessionUser?.avatar} alt="New Review Avatar" className="newReviewAvatar" draggable="False" />
          </a>
        </div>
        <div className="newReviewInfoBox">
          <div>
            <a href="">
              {sessionUser?.fname} {sessionUser?.lname[0]}.
            </a>
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
