import { token } from "./Token";

export const fetchUser = async () => {
        const response = await fetch(
          "http://bluesentinal.somee.com/api/Usuarios/me",
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