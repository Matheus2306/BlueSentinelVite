import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import App from "./App.jsx";
import { initTheme } from "./theme";
import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CamView from "./pages/CamView.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import { BrowserRouter, Route, Routes } from "react-router";

import "./i18n"; // importa a config
// initialize theme variables from localStorage before first render
initTheme();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/cam" element={<CamView />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
