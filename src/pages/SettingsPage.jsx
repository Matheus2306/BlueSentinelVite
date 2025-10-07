import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { setRootFontSize } from "../theme";

const SettingsPage = () => {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState("sistema");
  const [language, setLanguage] = useState("portugues");
  const [fontSize, setFontSize] = useState(16);
  const [screenReader, setScreenReader] = useState(false);

  const navigate = useNavigate();

  const changeLanguage = (lang) => {
    setLanguage(lang === "pt" ? "portugues" : "ingles");
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    try {
      const stored = localStorage.getItem("rootFontSize");
      if (stored) {
        const n = Number(stored);
        setFontSize(n);
        setRootFontSize(n);
      }
    } catch {
      // ignore
    }
  }, []);

  return (
    <>
      <header>
        <button
          id="homeBtn"
          className="icon-btn fs-1"
          title={t("Home")}
          type="button"
          onClick={() => navigate("/")}
        >
          <i className="bi bi-house-fill"></i>
        </button>
      </header>
      <div className="settings-page d-flex flex-column align-items-center justify-content-center">
        <div className="settings-card text-center p-4 rounded">
          <div className="settings-icon">
            <i className="bi bi-globe2"></i>
          </div>
          <h4 className="mb-4">{t("Alteracoes")}</h4>

          <div className="row mb-3 align-items-center">
            <div className="col-5 text-end fw-semibold">
              {t("PreferenciaDeTema")}
            </div>
            <div className="col-7 text-start">
              <button
                className={`btn btn-sm me-2 ${
                  theme === "sistema" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("sistema")}
              >
                {t("Sistema")}
              </button>
              <button
                className={`btn btn-sm me-2 ${
                  theme === "claro" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("claro")}
              >
                {t("Claro")}
              </button>
              <button
                className={`btn btn-sm ${
                  theme === "escuro" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("escuro")}
              >
                {t("Escuro")}
              </button>
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-5 text-end fw-semibold">{t("Idioma")}</div>
            <div className="col-7 text-start">
              <button
                className={`btn btn-sm me-2 ${
                  language === "portugues" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => changeLanguage("pt")}
              >
                {t("Portugues")}
              </button>
              <button
                className={`btn btn-sm ${
                  language === "ingles" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => changeLanguage("en")}
              >
                {t("Ingles")}
              </button>
            </div>
          </div>

          <h5 className="mb-3">{t("Acessibilidade")}</h5>

          <div className="mb-3">
            <label className="fw-semibold">{t("TamanhoDaFonte")}</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => {
                  const v = Number(e.target.value);
                  setFontSize(v);
                  try {
                    localStorage.setItem("rootFontSize", String(v));
                  } catch {
                    // ignore storage errors
                  }
                  setRootFontSize(v);
                }}
                className="form-range w-50 mx-3"
              />
              <span>{fontSize}</span>
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-semibold me-3">{t("LeituraDeTela")}</label>
            <div
              className="form-check form-switch d-inline-block"
              style={{ transform: "scale(1.3)" }}
            >
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                checked={screenReader}
                onChange={() => setScreenReader(!screenReader)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
