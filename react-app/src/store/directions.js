const SET_DIRECTIONS = 'directions/SET_DIRECTIONS';
const REMOVE_DIRECTIONS = 'directions/REMOVE_DIRECTIONS';

const load = (directions) => ({
  type: SET_DIRECTIONS,
  payload: directions
});

const initialState = { directions: null };

export const getDirections = (id) => async dispatch => {
  const response = await fetch(`/api/directions/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  } else return "Thunk Error: Bad Req"
}

export default function directionsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_DIRECTIONS:
      return { directions: action.payload }
    case REMOVE_DIRECTIONS:
      return { directions: null }
    default:
      return state;
  }
}
