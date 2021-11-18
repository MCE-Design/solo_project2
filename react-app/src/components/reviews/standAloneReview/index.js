import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview, getReview, editReview } from "../../../store/review";
import "../standAloneReview/standAloneReview.css";
import { getBusiness } from '../../../store/business';
import { useParams, NavLink, useHistory } from 'react-router-dom';

function StandAloneReview({ reviewType }) {
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const { businessId, reviewId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const currentReview = useSelector(state => state.review.review);
  const { business } = useSelector((state) => state.business);

  const [starRatingVal, setStarRatingVal] = useState();
  const [reviewText, setReviewText] = useState("");

  const [image, setImage] = useState(null);
  const [imageCaption, setImageCaption] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [imageTypeId, setImageTypeId] = useState();

  const reviewTextPlaceholder = "Woof woof, arf, aroo!"

  console.log("THREADED REVIEW TYPE", reviewType)

  const animator = (uniqueObjectClass) => {
    const animatedObj = document.querySelector(uniqueObjectClass);
    console.log("THE OBJECT", animatedObj)
    if (animatedObj) {
      requestAnimationFrame(() => {
        animatedObj.classList.remove("scrollBlinder")
      })
    }
  }

  useEffect(() => {
    animator(".reviewSubmitError");
  })

  useEffect(() => {
    dispatch(getBusiness(businessId));
    if (reviewType === "edit") {
      dispatch(getReview(reviewId));
    }
  }, [dispatch, businessId, reviewId, reviewType]);

  useEffect(() => {
    setErrors(currentReview?.errors);
  }, [currentReview?.errors])

  useEffect(() => {
    if (reviewType === "edit") {
      setStarRatingVal(currentReview?.rating);
      setReviewText(currentReview?.review);
    }
  }, [currentReview])

  useEffect(() => {
    const reviewField = document.querySelector(".standAloneReviewText");
    const starBox = document.querySelector(".starRatingButtons").children;
    if (starRatingVal > 0) {
      starBox.item(starRatingVal - 1).checked = true;
    }
    reviewField.textContent = reviewText;

  }, [reviewText, starRatingVal])

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errorData = [];
    console.log("FORM HIT")
    console.log("userId", sessionUser.id, "businessId", businessId, "starRating", starRatingVal, "review", reviewText)
    if (starRatingVal && reviewText && reviewText.length <= 5000) {
      const formData = new FormData();

      if (reviewType === "edit") {
        formData.append("id", reviewId);
      }
      formData.append("userId", sessionUser.id);
      formData.append("businessId", businessId);
      formData.append("rating", starRatingVal);
      formData.append("review", reviewText);
      if (reviewType === "new") {
        const data = await dispatch(newReview(formData));
        if (data) {
          return setErrors(data);
        }
      } else if (reviewType === "edit") {
        const data = await dispatch(editReview(formData));
        if (data) {
          return setErrors(data);
        }
      }
      // Notch in image uploading as a separate dispatch that only goes if everything else is O.K.
      history.push(`/business/${businessId}`);
    } else {
      if (!starRatingVal) {
        errorData.push("To submit your review, please select a star rating for this business.");
      } else if (reviewText.length === 0) {
        errorData.push("To submit your review, please explain your rating to others.");
      } else if (reviewText.length > 5000) {
        errorData.push("To submit your review, please shorten it to be 5,000 characters or less.");
      }
      setErrors(errorData);
    }
  }

  const hoverStars = (element) => {
    console.log("The Element", element)
  }

  console.log("Star Rating", starRatingVal)
  console.log("Review Text", reviewText)

  console.log("THE ERRORS", errors)

  const handleRadioChange = (event) => {
    setStarRatingVal(event.target.value)
  }
  return (
    <div className="standAloneReview container">
      <div className="standAloneReviewContent">
        <div className="standAloneReviewTop">
          <NavLink to={`/business/${businessId}`}>
            <h1>{business?.name}</h1>
          </NavLink>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="standAloneReviewBottom">
            <div className="standAloneUpperBox">
              <div className="starRatingButtons" >
                <input type="radio" onChange={handleRadioChange} value="1" name="starRating">

                </input>
                <input type="radio" onChange={handleRadioChange} value="2" name="starRating">

                </input>
                <input type="radio" onChange={handleRadioChange} value="3" name="starRating">

                </input>
                <input type="radio" onChange={handleRadioChange} value="4" name="starRating">

                </input>
                <input type="radio" onChange={handleRadioChange} value="5" name="starRating">

                </input>
              </div>
              <div className="starRatingDisplay">
                <div></div>
                {/* <div className="">{ratingText}</div> */}
              </div>
            </div>
            <div className="standAloneReviewTextContainer">
              <div contentEditable="true" className="standAloneReviewText" onInput={(e) => setReviewText(e.currentTarget.textContent)}></div>
              {reviewText?.length === 0 && (<div className="standAloneReviewPlaceholder">{reviewTextPlaceholder}</div>)}
            </div>
            <div className="reviewStatusMessageBox">
              {errors?.length > 0 && (
                <ul>
                  {errors?.map((error, idx) => {
                    return (
                      <li className="reviewSubmitError animation scrollBlinder" key={idx}>
                        {error}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </form>
        <div className={reviewText?.length > 5000 ? ("charCounter overLimit") : ("charCounter")}>{5000 - reviewText?.length}</div>
        <h4>Attach Photo</h4>
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={updateImage}
            className="inputContainer file"
          />
          <div contentEditable="true" onInput={(e) => setImageCaption(e.currentTarget.textContent)} className="">

          </div>
          <div className={imageCaption.length > 1000 ? ("charCounter overLimit") : ("charCounter")}>{1000 - imageCaption.length}</div>
        </div>
        <button onClick={handleSubmit} className="redButton businessButton bodyButton button">
          Post Review
        </button>
      </div>
    </div>
  )
}
export default StandAloneReview;
