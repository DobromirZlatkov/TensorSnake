import actionTypes from "../actions/actionTypes";
import initialState from "../store/initialState";

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return action.payload;
    default:
      return state;
  }
};

export default userReducer;
