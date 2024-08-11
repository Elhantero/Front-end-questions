export const getFromLs = (key) => JSON.parse(window.localStorage.getItem(key)) || [];
export const setIntoLs = (key, arr) => window.localStorage.setItem(key, JSON.stringify(arr));
