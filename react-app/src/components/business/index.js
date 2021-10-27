import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./business.css";
import { getBusiness } from '../../store/business';
import { getReviewsByBusiness } from '../../store/review';
import { useParams, NavLink } from 'react-router-dom';
import NewReview from '../reviews/newReview';
import ReviewComponent from '../reviews/reviewComponent'

function Business() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business);
  const { review } = useSelector((state) => state.review);
  const sessionUser = useSelector(state => state.session.user);
  const [ userReviewed, setUserReviewed ] = useState(false);

  useEffect(() => {
    dispatch(getBusiness(businessId));
    dispatch(getReviewsByBusiness(businessId));
  }, [dispatch, businessId]);

  useEffect(() => {
    if (review?.reviews?.filter((ele) => ele?.userId === sessionUser?.id).length > 0) {
      setUserReviewed(true);
    } else {
      setUserReviewed(false);
    }
  }, [dispatch, review, sessionUser]);

  console.log("user reviewed?", userReviewed);
  console.log(business)
  console.log("sessionUser", sessionUser)
  console.log("Reviews", review?.reviews?.length)
  console.log("USER ID", sessionUser?.id)
  return (
    <>
      <div className="businessTop photoContainer container">
        <div className="businessTopContent">
          <div className="businessTitleBox">
            <div className="businessTitle">
              <h1>{business?.name}</h1>
            </div>
            <div className="businessRating">
              <div className="bussinessRatingImage">
              </div>
              <div className="businessReviewCount">{review?.reviews?.length} reviews</div>
            </div>
          </div>
        </div>
        <div className="photoCarousel">

        </div>
      </div>
      <div className="businessBottom">
        <div className="businessBottomContent">
          <div className="buttonBox">
            <NavLink to='/writereview' exact={true} className="redButton businessButton bodyButton button" activeClassName='active'>
              <div className="buttonIcon">

              </div>
              <div>
                Write a Review
              </div>
            </NavLink>
          </div>

        </div>
        <div>
          {/* Maps and Hours */}
        </div>
        <div className="reviewsContainer">
          {userReviewed === false ? (
            <div className="reviewsNewReviewContainer">
              <NewReview sessionUser = {sessionUser} businessId = {businessId}/>
            </div>
          ) : (
            <></>
          )}
          <ul>{/* Map Reviews Here in repeated <li>*/}
            {console.log("REVIEW", review?.reviews)}
            {review?.reviews?.map((review) => {
              return(
              <li key={review.id}>
                {console.log("HIT MAP")}
                <ReviewComponent review={review}/>
              </li>
              )
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
export default Business;
