import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toggleTheme } from "../theme";
import LogoHeader from "../img/logoHeader.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

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
        <button
          className="icon-btn"
          aria-label="Profile"
          onClick={() => {
            // If there's a stored user id, go to the login page; otherwise go to register
            const userId = localStorage.getItem("userId");
            if (userId) {
              navigate("/login");
            } else {
              navigate("/register");
            }
          }}
        >
          <i
            id="personIcon"
            className="bi bi-person-fill"
            aria-hidden="true"
          ></i>
        </button>

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
