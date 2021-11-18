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
  }else return "Thunk Error: Bad Req: Get all By Business"
}

export const newReview = (review) => async dispatch => {
  const response = await fetch(`/api/review`,
    {
      method: "POST",
      body: review
    }
  )
  if (response.ok) {
    const data = await response.json()
    console.log("OK")
    dispatch(load(data))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else return "Thunk Error: Review Submit Failed"
}

export const newReviewStandAlone = (review) => async dispatch => {
  const response = await fetch(`/api/review/standalone`,
    {
      method: "POST",
      body: review
    }
  )
  if (response.ok) {
    const data = await response.json()
    console.log("OK")
    dispatch(load(data))
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else return "Thunk Error: Review Submit Failed"
}

export const editReview = (review) => async dispatch => {
  const response = await fetch(`/api/review`,
    {
      method: "PUT",
      body: review,
    }
  )
  if (response.ok) {
    const data = await response.json()
    console.log("OK")
    console.log(data)
    dispatch(load(data))
  } else return "Thunk Error: Review Edit Failed"
}

export const deleteReview = (payload) => async dispatch => {
  const response = await fetch(`/api/review`,
    {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(payload)
    }
  )
  if (response.ok) {
    dispatch(removeReview())
    console.log("DELETE REVIEW OK")
  } else return "Thunk Error: Review Delete Failed"

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
