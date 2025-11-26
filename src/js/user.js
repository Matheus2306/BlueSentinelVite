import { token } from "./Token";
import { BASE_URLLocal } from "./Urls";

export const fetchUser = async (authToken) => {
  const Authorization = authToken || token;
  if (!Authorization) return null;

  const response = await fetch(BASE_URLLocal + "/api/Usuarios/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization,
    },
  });
  if (response.ok) {
    const data = await response.json();
    return data;
  }
  return null;
};
