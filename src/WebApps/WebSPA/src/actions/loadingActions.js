import actionTypes from "./actionTypes";

function setLoadingAction(payload) {
  return {
    type: actionTypes.SET_LOADING,
    payload
  };
}

export function setLoading(payload) {
  return dispatch => {
    dispatch(setLoadingAction(payload));
  };
}
