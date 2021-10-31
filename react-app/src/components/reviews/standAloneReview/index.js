import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from "../../../store/review";
import "../standAloneReview/standAloneReview.css";
import { getBusiness } from '../../../store/business';
import { useParams, NavLink, useHistory } from 'react-router-dom';

function StandAloneReview() {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const currentReview = useSelector(state => state.review.review);
  const { business } = useSelector((state) => state.business);

  const [starRatingVal, setStarRatingVal] = useState();
  const [reviewText, setReviewText] = useState("");
  const reviewTextPlaceholder = "Woof woof, arf, aroo!"

  useEffect(() => {
    dispatch(getBusiness(businessId));
    setErrors(currentReview?.errors);
  }, [dispatch, businessId, currentReview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorData = [];
    console.log("FORM HIT")
    console.log("userId", sessionUser.id, "businessId", businessId, "starRating", starRatingVal, "review", reviewText)
    if(starRatingVal && reviewText && reviewText.length <= 5000) {
      const formData = new FormData();

      formData.append("userId", sessionUser.id);
      formData.append("businessId", businessId);
      formData.append("rating", starRatingVal);
      formData.append("review", reviewText);
      const data = await dispatch(newReview(formData));
      if (data) {
        setErrors(data);
      }
      history.push(`/business/${businessId}}`);
    } else {
      if(!starRatingVal){
        errorData.push("To submit your review, please select a star rating for this business.");
      } else if(reviewText.length === 0){
        errorData.push("To submit your review, please explain your rating to others.");
      } else if(reviewText.length > 5000){
        errorData.push("To submit your review, please shorten it to be 5,000 or less.");
      }
      setErrors(errorData);
    }
  }

  const hoverStars = (element) => {
    console.log("The Element", element)
  }

  console.log(starRatingVal)
  console.log(reviewText)

  console.log("THE ERRORS", errors)
  return(
    <div className="standAloneReview">
      <div className="standAloneReviewContent">
        <div className="standAloneReviewTop">
          <NavLink to={`/business/${businessId}`}>
            <h1>{business?.name}</h1>
          </NavLink>
        </div>
        <div className="standAloneReviewBottom">
          <form onSubmit={handleSubmit}>
            <div className="standAloneUpperBox">
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
            <div className="standAloneReviewTextContainer">
              <div contentEditable="true" className="standAloneReviewText" onInput={(e) => setReviewText(e.currentTarget.textContent)}></div>
              {reviewText.length === 0 && (<div className="standAloneReviewPlaceholder">{reviewTextPlaceholder}</div>)}
            </div>
            <div className="reviewStatusMessageBox">
              {errors?.length > 0 && (
                <ul>
                  {errors?.map((error, idx) => {
                    return(
                      <li className="reviewSubmitError" key={idx}>
                        {error}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </form>
        </div>
        <div className={reviewText.length > 5000 ? ("charCounter overLimit") : ("charCounter")}>{5000 - reviewText.length}</div>
        <button onClick={handleSubmit} className="redButton businessButton bodyButton button">
          Post review
        </button>
      </div>
    </div>
  )
}
export default StandAloneReview;
