const SET_BUSINESS = 'session/SET_BUSINESS';
const REMOVE_BUSINESS = 'session/REMOVE_BUSINESS';

const load = (business) => ({
  type: SET_BUSINESS,
  payload: business
});

const removeBusiness = () => ({
  type: REMOVE_BUSINESS,
})

const initialState = { business: null };

export const getBusiness = (id) => async dispatch => {
  const response = await fetch(`/api/business/${id}`);
  if (response.ok) {
    const list = await response.json();
    dispatch(load(list));
  } else return "Thunk Error: Bad Req"
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_BUSINESS:
      return { business: action.payload }
    case REMOVE_BUSINESS:
      return { business: null }
    default:
      return state;
  }
}
