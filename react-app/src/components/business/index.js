import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./business.css";
import { getBusiness } from '../../store/business';
import { useParams, NavLink } from 'react-router-dom';
import NewReview from '../reviews/newReview';

function Business() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business);
  const sessionUser = useSelector(state => state.session.user);
  useEffect(() => {
    dispatch(getBusiness(businessId));
  }, [dispatch, businessId]);
  console.log(business)
  console.log("sessionUser", sessionUser)
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
              <div className="businessReviewCount">###### reviews</div>
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
          <div className="reviewsNewReviewContainer">
            <NewReview sessionUser = {sessionUser} />
          </div>
          <ul>{/* Map Reviews Here in repeated <li>*/}
            <li>

            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
export default Business;
