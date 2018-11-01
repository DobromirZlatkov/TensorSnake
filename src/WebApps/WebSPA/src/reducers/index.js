import { combineReducers } from "redux";

import { routerReducer as routing } from "react-router-redux";
import isLoading from "./loadingReducer";
import user from "./userReducer";
import isAuthenticated from "./authReducer";

// Our local reducers start working synergistically here.
const appReducer = combineReducers({
  routing,
  isLoading,
  user,
  isAuthenticated
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
