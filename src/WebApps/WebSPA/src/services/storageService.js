export function setStorageValue(key, value) {
  localStorage.setItem(key, value);
}

export function getStorageValue(key) {
  return localStorage.getItem(key);
}

export function removeStorageKey(key) {
  return localStorage.removeItem(key);
}
