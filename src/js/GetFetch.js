import { apiFetch } from "./Token";
import { BASE_URLLocal } from "./Urls";

export const getApi= async (topic) => {
  const response = await apiFetch(`${BASE_URLLocal}${topic}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `Failed to fetch data (${response.status})`);
  }

  return response.json();
};
