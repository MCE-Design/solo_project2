import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./business.css";
import { getBusiness } from '../../store/business';
import { getReviewsByBusiness } from '../../store/review';
import { useParams, NavLink } from 'react-router-dom';
import NewReview from '../reviews/newReview';
import ReviewComponent from '../reviews/reviewComponent'
import business1_image from '../../images/business_hero_images/business1/page_image1.jpg';
import business2_image from '../../images/business_hero_images/business2/page_image1.jpg';
import business3_image from '../../images/business_hero_images/business3/page_image1.jpg';

function Business() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business);
  const { review } = useSelector((state) => state.review);
  const sessionUser = useSelector(state => state.session.user);
  const [ userReviewed, setUserReviewed ] = useState(false);

  window.document.title = `Yap - ${business?.name}`

  useEffect(() => {
    dispatch(getBusiness(businessId));
    dispatch(getReviewsByBusiness(businessId));
  }, [dispatch, businessId, review?.reviews?.length]);

  useEffect(() => {
    if (review?.reviews?.filter((ele) => ele?.userId === sessionUser?.id).length > 0) {
      setUserReviewed(true);
    } else {
      setUserReviewed(false);
    }
  }, [dispatch, review, sessionUser]);
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
          <div className="businessButtonBox">
            {/* Enable Later when display page is 100% */}
            {/* <NavLink to='' className="transparentButton businessTopButton bodyButton button">
              See Photos
            </NavLink> */}
          </div>
        </div>
        <div className="photoCarousel">
          {business?.id === 1 && (
            <>
              <img src={business1_image} alt="top_placeholder"/>
              <img src={business1_image} alt="top_placeholder"/>
              <img src={business1_image} alt="top_placeholder"/>
            </>
          )}
          {business?.id === 2 && (
            <>
              <img src={business2_image} alt="top_placeholder"/>
              <img src={business2_image} alt="top_placeholder"/>
              <img src={business2_image} alt="top_placeholder"/>
            </>
          )}
          {business?.id === 3 && (
            <>
              <img src={business3_image} alt="top_placeholder"/>
              <img src={business3_image} alt="top_placeholder"/>
              <img src={business3_image} alt="top_placeholder"/>
            </>
          )}
        </div>
      </div>
      <div className="businessBottom contentBottom">
        <div className="businessBottomContent">
          <div className="buttonBox">
            {/* Change this later to do logged-out user workflow */}
            { sessionUser ? (
              <>
                <NavLink to={`${businessId}/newreview`} exact={true} className="redButton businessButton bodyButton button" activeClassName='active'>
                  <div className="buttonIcon">

                  </div>
                  <div>
                    Write a Review
                  </div>
                </NavLink>
                <NavLink to={`/business_photos/${businessId}/add`} exact={true} className="lightButton businessButton bodyButton button" activeClassName='active'>
                  <div className="buttonIcon">

                  </div>
                  <div>
                    Add Photo
                  </div>
                </NavLink>
              </>
            ) : (
              <></>
            )}

          </div>

        </div>
        <div>
          {/* Maps and Hours */}
        </div>
        <div className="reviewsContainer leftComponentContainer">
          {/* change later to do logged-out user workflow */}
          {userReviewed === false && sessionUser ? (
            <div className="reviewsNewReviewContainer">
              <NewReview sessionUser = {sessionUser} businessId = {businessId}/>
            </div>
          ) : (
            <></>
          )}
          <ul>{/* Map Reviews Here in repeated <li>*/}
            {review?.reviews?.map((review) => {
              return(
              <li key={review.id}>
                {console.log("HIT MAP")}
                <ReviewComponent review={review} sessionUser={sessionUser}/>
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
