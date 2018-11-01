import actionTypes from "./actionTypes";

function setUserAction(payload) {
  return {
    type: actionTypes.SET_USER,
    payload
  };
}

export function setUser(payload) {
  return dispatch => {
    dispatch(setUserAction(payload));
  };
}
