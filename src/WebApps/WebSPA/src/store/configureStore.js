import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

let storeCompose = compose(applyMiddleware(thunk));

const configureStore = initialState =>
  createStore(rootReducer, initialState, storeCompose);

export default configureStore;
