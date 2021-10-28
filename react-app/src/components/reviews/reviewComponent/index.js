import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newReview } from "../../../store/review";
import "./reviewComponent.css";
// import { getBusiness } from '../../store/business';
import { useParams, NavLink } from 'react-router-dom';

function ReviewComponent({review}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState();
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
          <div className="reviewAvatarContainer">
            <a href={`/users/${userId}`} className="reviewAvatarLink"> {/* Disable later if no profile page */}
              <img src={user?.avatar} alt="Review Avatar" className="reviewAvatar" draggable="False" />
            </a>
          </div>
          <div className="reviewInfoBox">
            <div className="reviewName">
              <NavLink to={`/users/${userId}`}> {/* Disable later if no profile page */}
                {user?.fname} {user?.lname[0]}.
              </NavLink>
            </div>
            <div>{/* Location */}</div>
            <div>{/* Badges */}
              <div>{/* Friends */}</div>
              <div>{/* Revies */}</div>
              <div>{/* Images */}</div>
            </div>
          </div>
        </div>
        <div className="reviewBottom">
          <div className="rateAndDate">
            <div className="ratingInfoItem">
              {review.rating}
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




//   return(
//     <div className="newReview">
//       <div className="newReviewTop">
//         <div className="newReviewAvatarContainer">
//           <a href="" className="newReviewAvatarLink">
//             <img src={sessionUser?.avatar} alt="New Review Avatar" className="newReviewAvatar" draggable="False" />
//           </a>
//         </div>
//         <div className="newReviewInfoBox">
//           <div>
//             <a href="">
//               {sessionUser?.fname} {sessionUser?.lname[0]}.
//             </a>
//           </div>
//           <div>{/* Location */}</div>
//           <div>{/* Badges */}
//             <div>{/* Friends */}</div>
//             <div>{/* Revies */}</div>
//             <div>{/* Images */}</div>
//           </div>
//         </div>
//       </div>
//       <div className="newReviewBottom">
//         <form onSubmit={handleSubmit}>
//           <div className="">
//             <div className="starRatingButtons">
//               <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="1" name="starRating">

//               </input>
//               <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="2" name="starRating">

//               </input>
//               <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="3" name="starRating">

//               </input>
//               <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="4" name="starRating">

//               </input>
//               <input type="radio" onChange={(e) => setStarRatingVal(e.target.value)} value="5" name="starRating">

//               </input>
//             </div>
//             <div className="starRatingDisplay">
//               <div></div>
//               {/* <div className="">{ratingText}</div> */}
//             </div>
//           </div>
//           <textarea className="newReviewText" onChange={(e) => setReviewText(e.target.value)} placeholder={reviewTextPlaceholder}>

//           </textarea>
//           <div>
//             {/* Errors go here */}
//           </div>
//           <button type="submit" className="redButton businessButton bodyButton button">
//             Post review
//           </button>
//         </form>
//       </div>
//     </div>
//   )
}
export default ReviewComponent;
