export const useSessionStorage = (key) => {
  const setSessionStorage = (data) =>
    localStorage.setItem(key, JSON.stringify(data));

  const getSessionStorage = JSON.parse(localStorage.getItem(key))?.access_token;

  const removeSessionStorage = () => localStorage.removeItem(key);

  return { setSessionStorage, getSessionStorage, removeSessionStorage };
};
