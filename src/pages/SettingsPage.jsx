import React, { useState } from "react";
import { useNavigate } from "react-router";

const SettingsPage = () => {
  const [theme, setTheme] = useState("sistema");
  const [language, setLanguage] = useState("portugues");
  const [fontSize, setFontSize] = useState(16);
  const [screenReader, setScreenReader] = useState(false);

  const navigate = useNavigate();

  return (

    <>
      <header>
        <button id="homeBtn" className="icon-btn fs-1" title="Home" type="button" onClick={() => navigate("/")}>
          <i className="bi bi-house-fill"></i>
        </button>
      </header>
      <div className="settings-page d-flex flex-column align-items-center justify-content-center">
        <div className="settings-card text-center p-4 rounded">
          <div className="settings-icon">
            <i className="bi bi-globe2"></i>
          </div>
          <h4 className="mb-4">Alterações</h4>

          <div className="row mb-3 align-items-center">
            <div className="col-5 text-end fw-semibold">
              Preferência de Tema:
            </div>
            <div className="col-7 text-start">
              <button
                className={`btn btn-sm me-2 ${
                  theme === "sistema" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("sistema")}
              >
                Sistema
              </button>
              <button
                className={`btn btn-sm me-2 ${
                  theme === "claro" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("claro")}
              >
                Claro
              </button>
              <button
                className={`btn btn-sm ${
                  theme === "escuro" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setTheme("escuro")}
              >
                Escuro
              </button>
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-5 text-end fw-semibold">Idioma:</div>
            <div className="col-7 text-start">
              <button
                className={`btn btn-sm me-2 ${
                  language === "portugues" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setLanguage("portugues")}
              >
                Português
              </button>
              <button
                className={`btn btn-sm ${
                  language === "ingles" ? "btn-primary" : "btn-secondary"
                }`}
                onClick={() => setLanguage("ingles")}
              >
                Inglês
              </button>
            </div>
          </div>

          <h5 className="mb-3">Acessibilidade</h5>

          <div className="mb-3">
            <label className="fw-semibold">Tamanho da Fonte:</label>
            <div className="d-flex align-items-center justify-content-center">
              <input
                type="range"
                min="12"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value)}
                className="form-range w-50 mx-3"
              />
              <span>{fontSize}</span>
            </div>
          </div>

          <div className="mb-3">
            <label className="fw-semibold me-3">Leitura de tela:</label>
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
