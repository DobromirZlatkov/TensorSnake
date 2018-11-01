import { getStorageValue } from "./storageService";

export function get(url, headers = {}) {
  return fetch(url, {
    method: "GET",
    headers: headers
  });
}

export function post(url, body = {}, headers = {}) {
  return fetch(url, {
    method: "POST",
    headers: headers,
    body: body
  });
}

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

  return fetch(url, requestConfig);
}
