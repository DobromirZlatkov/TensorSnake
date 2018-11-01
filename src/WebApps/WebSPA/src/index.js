import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { syncHistoryWithStore } from "react-router-redux";
import { getStorageValue } from "./services/storageService";
import { authorizedFetch } from "./services/requestService";
import GlobalConstants from "./utils/globalConstants";
import { setUser } from "./actions/userActions";
import { setIsAuthenticated } from "./actions/authActions";

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store);
const token = getStorageValue("authentication");

if (token) {
  authorizedFetch(GlobalConstants.USER_DATA_URL, "GET")
    .then(res => res.json())
    .then(res => {
      let userData = {
        userId: res.sub,
        userName: res.name
      };
      store.dispatch(setUser(userData));
      store.dispatch(setIsAuthenticated(true));
    });
}

ReactDOM.render(
  <Provider store={store} history={history}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
