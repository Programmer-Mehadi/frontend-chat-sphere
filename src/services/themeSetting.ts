export const setThemeModeOnLocalStorage = (themeMode: string) => {
  localStorage.setItem("themeMode", themeMode);
};
export const getThemeModeFromLocalStorage = () => {
  return localStorage.getItem("themeMode") || "light";
};
