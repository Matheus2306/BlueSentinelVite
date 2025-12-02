import { BASE_URLLocal } from "./Urls";

export let token = null;
export let tokenExpiresAt = null; // timestamp em ms
export let refreshToken = null;

const STORAGE_KEY = "bluesentinel.auth";

// try to initialize from localStorage
try {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    const obj = JSON.parse(raw);
    if (obj && obj.accessToken && obj.tokenType) {
      token = `${obj.tokenType} ${obj.accessToken}`;
      tokenExpiresAt =
        obj.tokenExpiresAt || Date.now() + (obj.expiresIn || 0) * 1000;
      refreshToken = obj.refreshToken || null;
    }
  }
} catch {
  // ignore if localStorage not available or corrupt
}

// guarda token + validade + refreshToken
export const setToken = ({
  tokenType,
  accessToken,
  expiresIn,
  newRefreshToken,
}) => {
  token = `${tokenType} ${accessToken}`;
  tokenExpiresAt = Date.now() + expiresIn * 1000;
  if (newRefreshToken) {
    refreshToken = newRefreshToken;
  }

  // persist to localStorage when possible
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        tokenType,
        accessToken,
        expiresIn,
        tokenExpiresAt,
        refreshToken: refreshToken || null,
      })
    );
  } catch {
    // ignore storage errors
  }
};

export const isTokenExpired = () => {
  if (!token || !tokenExpiresAt) return true;
  return Date.now() > tokenExpiresAt;
};

// Helper para chamadas autenticadas com refresh automático
export const apiFetch = async (url, options = {}) => {
  let currentToken = token;

  if (!currentToken || isTokenExpired()) {
    try {
      if (!refreshToken) {
        throw new Error("Sem refreshToken disponível");
      }

      const res = await fetch(
        BASE_URLLocal + "/Usuario/refresh",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ refreshToken }),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || `Erro refresh-token ${res.status}`);
      }

      setToken({
        tokenType: data.tokenType,
        accessToken: data.accessToken,
        expiresIn: data.expiresIn,
        newRefreshToken: data.refreshToken,
      });

      currentToken = token;
    } catch (err) {
      console.error("Falha ao renovar token", err);
      throw err;
    }
  }

  return fetch(url, {
    ...(options || {}),
    headers: {
      ...(options && options.headers ? options.headers : {}),
      Authorization: currentToken,
    },
  });
};

export const clearToken = () => {
  token = null;
  tokenExpiresAt = null;
  refreshToken = null;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};
