export let token = null;
export let tokenExpiresAt = null; // timestamp em ms
export let refreshToken = null;

// guarda token + validade + refreshToken
export const setToken = ({ tokenType, accessToken, expiresIn, newRefreshToken }) => {
  token = `${tokenType} ${accessToken}`;
  tokenExpiresAt = Date.now() + expiresIn * 1000;
  if (newRefreshToken) {
    refreshToken = newRefreshToken;
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

      const res = await fetch("http://bluesentinal.somee.com/Usuario/refresh-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

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
};

