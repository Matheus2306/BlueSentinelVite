// ...existing code...
import { useNavigate } from "react-router";
import { toggleTheme } from "../theme";
import LogoHeader from "../img/logoHeader.png";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <header id="header">
      <img src={LogoHeader} alt={t("Home")} id="logo" />
      <nav className="header-icons" aria-label="User actions">
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

        <button className="icon-btn" aria-label={t("Settings")}>
          <i
            id="settingsIcon"
            className="bi bi-gear-fill"
            aria-hidden="true"
            onClick={() => navigate("/settings")}
          ></i>
        </button>

        <button
          className="icon-btn"
          aria-label={t("ToggleDarkMode")}
          onClick={() => {
            toggleTheme();
          }}
        >
          <i id="moonIcon" className="bi bi-moon-fill" aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;
// ...existing code...
