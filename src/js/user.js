import { token } from "./Token";
import { BASE_URLLocal } from "./Urls";

export const fetchUser = async () => {
        const response = await fetch(
          BASE_URLLocal + "/api/Usuarios/me",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          return data;
          
        }
      };