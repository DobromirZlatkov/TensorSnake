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
