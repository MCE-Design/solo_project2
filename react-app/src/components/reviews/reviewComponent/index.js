import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "./reviewComponent.css";
// import { getBusiness } from '../../store/business';
import { NavLink } from 'react-router-dom';
import { deleteReview } from "../../../store/review";
import menuDots_horiz from "../../../images/menuDots_horiz.svg";

function ReviewComponent({review, sessionUser}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const [reviewMenu, setReviewMenu] = useState(false);
  const userId = review?.userId;

  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);


  const handleMenuToggle = (event) => {
    if(!reviewMenu){
      setReviewMenu(true);
    } else {
      setReviewMenu(false);
    }
  }

  const handleDelete  = async () => {
    const payload = {
      id: review.id,
      businessId: review.businessId
    }
    const data = await dispatch(deleteReview(payload));
  }

  useEffect(() => {
    function handleClickOutside(event) {
      let reviewButton = document.querySelector(".reviewButton");
      let dropDownMenu = document.querySelector(".reviewDropdownMenu");
      console.log(event.target)
      console.log("reviewButton", reviewButton)
      if(reviewMenu && !dropDownMenu?.contains(event.target)){
        console.log("HIT")
        setReviewMenu(false)
        reviewButton?.classList.remove("active")
      } else {
        reviewButton?.classList.add("active")
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, [reviewMenu])


  console.log("USER ID FROM REVIEW", userId)
  console.log("COMPONENT HIT")
  console.log("USER", user)
  console.log("USER === {}", user === {})
  if (!review || !user){
    return null
  } else {
    return(
      <div className={`review ${review?.id}`}>
        <div className="reviewTop">
          <div className="reviewTopLeft">
            <div className="reviewAvatarContainer">
              { sessionUser?.id === userId ? (
                <a href={`/users/${userId}`} className="reviewAvatarLink">
                  <img src={user?.avatar} alt="Review Avatar" className="reviewAvatar" draggable="False" />
                </a>
              ) : (
                <div className="reviewAvatarLink"> {/* Enable later */}
                  <img src={user?.avatar} alt="Review Avatar" className="reviewAvatar" draggable="False" />
                </div>
              )}
            </div>
            <div className="reviewInfoBox">

              <div className="reviewName">
                { sessionUser?.id === userId ? (
                  <NavLink to={`/users/${userId}`}>
                    {user?.fname} {user?.lname[0]}.
                  </NavLink>
                ) : (
                  <a> {/* Enable later */}
                    {user?.fname} {user?.lname[0]}.
                  </a>
                )}
              </div>
              <div>{/* Location */}</div>
              <div>{/* Badges */}
                <div>{/* Friends */}</div>
                <div>{/* Revies */}</div>
                <div>{/* Images */}</div>
              </div>
            </div>
          </div>
          <div className="reviewTopRight">
            {console.log("SessionUser", sessionUser)}
            {console.log("user", userId)}
            {console.log("session user and user", sessionUser?.id === userId)}
            {sessionUser?.id === userId && (
              <>
                <button className="reviewButton button" onClick={handleMenuToggle}>
                  <span className="buttonIcon" style={{backgroundImage: `url(${menuDots_horiz})`}}></span>
                </button>
                {reviewMenu && (
                  <div className="reviewDropdownMenu">
                    <ul>
                      {/* <li>
                        Write an update
                      </li> */}
                      <li className="reviewDropdownSelection">
                        <NavLink to={`/business/${review?.businessId}/editreview/${review?.id}`} className="button">
                          Edit review
                        </NavLink>
                      </li>
                      <li className="reviewDropdownSelection">
                        <button onClick={handleDelete} className="button">
                          Remove review
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="reviewBottom">
          <div className="rateAndDate">
            <div className="ratingText ratingInfoItem">
              {review.rating}/5 Stars
            </div>
            <div className="ratingInfoItem">
              {review.createdAt}
            </div>
          </div>
          <div className="reviewText">
            {review.review}
          </div>
          <div className="photoBox">

          </div>
        </div>
      </div>
    )
  }
}
export default ReviewComponent;
