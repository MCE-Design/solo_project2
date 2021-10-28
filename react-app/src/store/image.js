const SET_IMAGE = 'image/SET_IMAGE';
const REMOVE_IMAGE = 'image/REMOVE_IMAGE';

const load = (image) => ({
  type: SET_IMAGE,
  payload: image
});

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

export default function imageReducer(state = initialState, action) {
  switch (action.type) {
    case SET_IMAGE:
      return { image: action.payload }
    case REMOVE_IMAGE:
      return { image: null }
    default:
      return state;
  }
}
