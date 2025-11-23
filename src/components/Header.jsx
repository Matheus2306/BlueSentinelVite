import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { toggleTheme } from "../theme";
import LogoHeader from "../img/logoHeader.png";
import { useTranslation } from "react-i18next";
import { token } from "../js/TokenContext";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState(null);

  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    const ac = new AbortController();
    const fetchUser = async () => {
      setUserError(null);
      setLoadingUser(true);
      try {
        const res = await fetch("http://bluesentinal.somee.com/Usuarios/me", {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          // treat as no user / unauthenticated
          setUser(null);
        } else {
          const data = await res.json();
          setUser(data);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setUser(null);
          setUserError(err);
        }
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
    return () => ac.abort();
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
            ) : user ? (
              <>
                <span>{user.nome}</span>
                <button
                  className="icon-btn"
                  aria-label="Logout"
                  onClick={() => {
                    // call logout from context and navigate to login page
                    try {
                      logout();
                    } finally {
                      navigate("/login");
                    }
                  }}
                >
                  <i className="bi bi-box-arrow-right" aria-hidden="true"></i>
                </button>
              </>
            ) : (
              <button
                className="icon-btn"
                aria-label="Profile"
                onClick={() => navigate("/login")}
              >
                <i
                  id="personIcon"
                  className="bi bi-person-fill"
                  aria-hidden="true"
                ></i>
              </button>
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
