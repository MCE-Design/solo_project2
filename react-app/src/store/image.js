const SET_IMAGE = 'image/SET_IMAGE';
const REMOVE_IMAGE = 'image/REMOVE_IMAGE';
const SET_BUSINESS_IMAGE = 'image/SET_BUSINESS_IMAGE';

const load = (image) => ({
  type: SET_IMAGE,
  payload: image
});

const businessLoad = (image) => ({
  type: SET_BUSINESS_IMAGE,
  payload: image
})

const removeImage = () => ({
  type: REMOVE_IMAGE,
})

const initialState = { image: null };

export const getImage = (id) => async dispatch => {
  const response = await fetch(`/api/image/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  } else return "Thunk Error: Bad Req"
}

export const getUserImagesUser = (id) => async dispatch => {
  const response = await fetch(`/api/users/${id}/images`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  } else return "Thunk Error: Bad Req"
}

export const getBusinessImages = (id) => async dispatch => {
  const response = await fetch(`/api/business/${id}/images`);
  if (response.ok) {
    const list = await response.json();
    dispatch(businessLoad(list));
  } else return "Thunk Error: Bad Req";
}

export const deleteImage = (id) => async dispatch => {
  const response = await fetch(`/api/image`,
    {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ id: id })
    }
  )
  if (response.ok) {
    dispatch(removeImage())
  } else return "Thunk Error: Delete Image"
}

export const editImageCaption = (editedCaption) => async dispatch => {
  const response = await fetch(`/api/image`,
    {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(editedCaption)
    }
  )
  console.log("EDIT HIT")
  console.log("RESPONSE BODY", response)
  if (response.ok) {
    const data = await response.json()
      dispatch(load(data))
  } else return "Thunk Error: Edit Caption"
}

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE:
      return { image: action.payload }
    case REMOVE_IMAGE:
      return { image: null }
    case SET_BUSINESS_IMAGE:
      return { businessImage: action.payload }
    default:
      return state;
  }
}
