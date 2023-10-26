export const setTokenOnLocalStorage = (name: string, token: string) => {
  localStorage.setItem(name, token);
};
export const getTokenOnLocalStorage = (name: string) => {
  return localStorage.getItem(name) || "";
};
