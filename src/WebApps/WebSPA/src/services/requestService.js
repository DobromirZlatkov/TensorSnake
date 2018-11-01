import HttpStatus from "http-status-codes";
import { getStorageValue, removeStorageKey } from "./storageService";
import store from "../store/configureStore";
import { setIsAuthenticated } from "../actions/authActions";

export function authorizedFetch(url, method, body = {}, headers = {}) {
  const requestHeaders = Object.assign(headers, {
    Accept: "application/json",
    "Content-Type": "application/json"
  });

  const requestConfig = {
    method,
    headers: requestHeaders
  };

  try {
    const accessToken = getStorageValue("authentication");
    requestHeaders.Authorization = `Bearer ${accessToken}`;
  } catch (error) {
    console.log(error.message); // TODO log this error to error login
  }

  /**
   * @desc: append body to request config if req is post or put
   */
  if (
    method.toLowerCase() === "post" ||
    method.toLowerCase() === "put" ||
    method.toLowerCase() === "patch" ||
    method.toLowerCase() === "delete"
  ) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = fetch(url, requestConfig).then(res => {
    if (res.status === HttpStatus.UNAUTHORIZED) {
      removeStorageKey("authentication");
      store().dispatch(setIsAuthenticated(false));
      return Promise.reject(res);
    }
    return Promise.resolve(res);
  });

  return response;
}
