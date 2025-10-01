import React from "react";
import LogoHeader from "../img/logoHeader.png";

const Header = () => {
  return (
    <header id="header">
      <img src={LogoHeader} alt="Logo Blue Sentinel" id="logo" />
      <nav className="header-icons" aria-label="User actions">
        <button className="icon-btn" aria-label="Video">
          <i
            id="videoIcon"
            className="bi bi-camera-video-fill"
            aria-hidden="true"
          ></i>
        </button>
        <button className="icon-btn" aria-label="Analytics">
          <i id="graphIcon" className="bi bi-graph-up" aria-hidden="true"></i>
        </button>
        <button className="icon-btn" aria-label="Profile">
          <i
            id="personIcon"
            className="bi bi-person-fill"
            aria-hidden="true"
          ></i>
        </button>
        <button className="icon-btn" aria-label="Settings">
          <i
            id="settingsIcon"
            className="bi bi-gear-fill"
            aria-hidden="true"
          ></i>
        </button>
        <button className="icon-btn" aria-label="Toggle dark mode">
          <i id="moonIcon" className="bi bi-moon-fill" aria-hidden="true"></i>
        </button>
      </nav>
    </header>
  );
};

export default Header;
