import React, { createContext, useContext, useEffect, useState } from "react";
import {
  setToken as setTokenHelper,
  clearToken as clearTokenHelper,
} from "../js/Token";

const STORAGE_KEY = "bluesentinel.auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const obj = JSON.parse(raw);
        if (obj && obj.accessToken && obj.tokenType) {
          return {
            token: `${obj.tokenType} ${obj.accessToken}`,
            expiresAt: obj.tokenExpiresAt || null,
            refreshToken: obj.refreshToken || null,
          };
        }
      }
    } catch {
      // ignore
    }
    return { token: null, expiresAt: null, refreshToken: null };
  });

  useEffect(() => {
    // No-op: keep localStorage in sync when auth state changes is handled in Token.js setToken/clearToken
  }, [auth]);

  const login = ({ tokenType, accessToken, expiresIn, newRefreshToken }) => {
    // persist via Token helper
    setTokenHelper({ tokenType, accessToken, expiresIn, newRefreshToken });
    setAuth({
      token: `${tokenType} ${accessToken}`,
      expiresAt: Date.now() + expiresIn * 1000,
      refreshToken: newRefreshToken || null,
    });
  };

  const logout = () => {
    clearTokenHelper();
    setAuth({ token: null, expiresAt: null, refreshToken: null });
  };

  const value = {
    token: auth.token,
    expiresAt: auth.expiresAt,
    refreshToken: auth.refreshToken,
    isAuthenticated: !!auth.token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
