
export let token = null;

export const setToken = (newToken) => {
  token = "Bearer " + newToken;
};
