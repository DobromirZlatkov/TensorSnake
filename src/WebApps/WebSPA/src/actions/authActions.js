import actionTypes from "./actionTypes";

function setIsAuthenticatedAction(payload) {
  return {
    type: actionTypes.SET_AUTHENTICATED,
    payload
  };
}

export function setIsAuthenticated(payload) {
  return dispatch => {
    dispatch(setIsAuthenticatedAction(payload));
  };
}
