export function setStorageValue(key, value) {
  localStorage.setItem(key, value);
}

export function getStorageValue(key) {
  return localStorage.getItem(key);
}
