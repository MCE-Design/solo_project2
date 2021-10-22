import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "./business.css";
import { getBusiness } from '../../store/business';
import { useParams } from 'react-router-dom';

function Business() {
  const dispatch = useDispatch();
  const { businessId } = useParams();
  const { business } = useSelector((state) => state.business)
  useEffect(() => {
    dispatch(getBusiness(businessId));
  }, [dispatch, businessId]);
  console.log(business)
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
    </>
  );
}
export default Business;
