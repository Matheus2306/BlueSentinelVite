import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toggleTheme } from "../theme";
import LogoHeader from "../img/logoHeader.png";
import { useTranslation } from "react-i18next";
import { clearToken, token } from "../js/Token";
import { fetchUser } from "../js/user";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    // Fetch user info if token is set
    try {
      setLoadingUser(true);


      fetchUser().then((data) => {
        setUser(data);
      });
    } catch (e) {
      console.error("Failed to fetch user info", e);
    } finally {
      setLoadingUser(false);
    }
  }, [token]);

  // Track theme mode locally so we can switch the icon when theme changes
  const [mode, setMode] = useState(() => {
    try {
      return localStorage.getItem("themeMode") || "sistema";
    } catch {
      return "sistema";
    }
  });

  useEffect(() => {
    // Keep in sync with other tabs/windows that may change theme
    const onStorage = (e) => {
      if (e.key === "themeMode") {
        setMode(e.newValue || "sistema");
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleToggle = () => {
    // toggleTheme updates localStorage synchronously; read new value and update state
    toggleTheme();
    try {
      const m = localStorage.getItem("themeMode") || "sistema";
      setMode(m);
    } catch {
      setMode((prev) => (prev === "claro" ? "escuro" : "claro"));
    }
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
  };

  const themeIconClass =
    mode === "claro" ? "bi bi-brightness-high-fill" : "bi bi-moon-fill";

  return (
    <header id="header">
      <img src={LogoHeader} alt={t("Home")} id="logo" />
      <nav className="header-icons" aria-label="User actions">
        {/* Show a Home icon on every page except the site root */}
        {location && location.pathname !== "/" && (
          <button
            className="icon-btn"
            aria-label="Home"
            onClick={() => navigate("/")}
          >
            <i className="bi bi-house-fill" aria-hidden="true"></i>
          </button>
        )}
        <button className="icon-btn" aria-label="Video">
          <i
            id="videoIcon"
            className="bi bi-camera-video-fill"
            aria-hidden="true"
            onClick={() => navigate("/cam")}
          ></i>
        </button>

        <button
          className="icon-btn"
          aria-label="Analytics"
          onClick={() => navigate("/dashboard")}
        >
          <i id="graphIcon" className="bi bi-graph-up" aria-hidden="true"></i>
        </button>

        {/* Make this a button for accessibility and put navigate inside the component */}
        {token ? (
          <div className="user-info">
            {loadingUser ? (
              <span>Carregando...</span>
            ) : (
              <>
                <span>{user.nome}</span>
                <button
                  className="icon-btn"
                  aria-label="Logout"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <i
                    className="bi bi-box-arrow-right fs-4"
                    aria-hidden="true"
                  ></i>
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            className="icon-btn"
            aria-label="Profile"
            onClick={() => {
              navigate("/register");
            }}
          >
            <i
              id="personIcon"
              className="bi bi-person-fill"
              aria-hidden="true"
            ></i>
          </button>
        )}

        <button
          className="icon-btn"
          aria-label={t("Settings")}
          onClick={() => navigate("/settings")}
        >
          <i
            id="settingsIcon"
            className="bi bi-gear-fill"
            aria-hidden="true"
          ></i>
        </button>

        <button
          className="icon-btn"
          aria-label={t("ToggleDarkMode")}
          onClick={handleToggle}
        >
          <i id="moonIcon" className={themeIconClass} aria-hidden="true"></i>
        </button>

        <button
          className="icon-btn"
          aria-label={t("About")}
          onClick={() => navigate("/about")}
        >
          <i className="bi bi-lightbulb-fill" aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;
