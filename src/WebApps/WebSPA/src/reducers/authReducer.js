import actionTypes from "../actions/actionTypes";
import initialState from "../store/initialState";

const isAuthenticatedReducer = (
  state = initialState.isAuthenticated,
  action
) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return action.payload;
    default:
      return state;
  }
};

export default isAuthenticatedReducer;
