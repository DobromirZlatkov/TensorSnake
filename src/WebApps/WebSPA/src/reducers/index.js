import { combineReducers } from "redux";

import { routerReducer as routing } from "react-router-redux";
import isLoading from "./loadingReducer";
import user from "./userReducer";

// Our local reducers start working synergistically here.
const appReducer = combineReducers({
  routing,
  isLoading,
  user
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
