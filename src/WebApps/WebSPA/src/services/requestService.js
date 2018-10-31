export function get(url, headers = {}) {
    return fetch(url, {
        method: "GET",
        headers: headers
    });
}
