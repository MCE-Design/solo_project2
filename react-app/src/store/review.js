const SET_REVIEW = 'review/SET_REVIEW';
const REMOVE_REVIEW = 'review/REMOVE_REVIEW';

const load = (review) => ({
  type: SET_REVIEW,
  payload: review
});

const removeReview = () => ({
  type: REMOVE_REVIEW,
})

const initialState = { review: null };

export const getReview = (id) => async dispatch => {
  const response = await fetch(`/api/review/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  } else return "Thunk Error: Bad Req"
}

export const getReviewsByBusiness = (id) => async dispatch => {
  const response = await fetch(`/api/business/${id}/review`)
  if (response.ok) {
    const list = await response.json();
    console.log("GET REVIEWS RESPONSE IS OK")
    console.log("LIST", list)
    dispatch(load(list));
  }else return "Thunk Error: Bad Req: All By Business"
}

export const newReview = (review) => async dispatch => {
  const response = await fetch(`/api/review/`,
    {
      method: "POST",
      // headers: { "Content-Type": "application/json" },
      // body: JSON.stringify(review)
      body: review
    }
  )
  if (response.ok) {
    const data = await response.json()
    console.log("OK")
    console.log(data)
    dispatch(load(data))
  } else return "Thunk Error: Review Submit Failed"
}

export const editReview = (review) => async dispatch => {
  console.log(review)
  const response = await fetch(`/api/review/`,
    {
      method: "PUT",
      body: review
    }
  )
  if (response.ok) {
    const data = await response.json()
    console.log("OK")
    console.log(data)
    dispatch(load(data))
  } else return "Thunk Error: Review Edit Failed"
}

export default function reviewReducer(state = initialState, action) {
  switch (action.type) {
    case SET_REVIEW:
      return { review: action.payload }
    case REMOVE_REVIEW:
      return { review: null }
    default:
      return state;
  }
}
