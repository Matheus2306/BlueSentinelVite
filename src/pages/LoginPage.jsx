import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { setToken } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.senha,
    };

    try {
      setLoading(true);
      const res = await fetch(BASE_URLLocal + "/Usuario/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        // try to extract server message
        let msg = `Erro ${res.status}`;
        try {
          const data = await res.json();
          msg = data?.message || JSON.stringify(data) || msg;
        } catch {
          const txt = await res.text();
          if (txt) msg = txt;
        }
        throw new Error(msg);
      }

      const data = await res.json();
      setToken({
        tokenType: data.tokenType,
        accessToken: data.accessToken,
        expiresIn: data.expiresIn,
        newRefreshToken: data.refreshToken,
      }); // store token globally
      setSuccessMessage("Login realizado com sucesso.");
      // optionally store token if backend returns one
      navigate("/");
    } catch (e) {
      console.error("Login failed", e);
      setErrorMessage(e?.message || String(e));
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="profile-edit-container d-flex align-items-center justify-content-center">
      <div className="profile-card p-4 shadow-lg position-relative text-center">
        <div className="profile-icon d-flex align-items-center justify-content-center mx-auto">
          <i className="bi bi-person-fill fs-1 text-white"></i>
        </div>

        <h2 className="title mt-5 mb-4">{t("Entrar")}</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="alert alert-success">{successMessage}</div>
          )}

          <div className="text-start">
            <label className="form-label text-light">{t("Email")}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control input-custom"
            />
          </div>

          <div className="text-start">
            <label className="form-label text-light">{t("Senha")}</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="form-control input-custom"
            />
          </div>

          {loading && (
            <div className="text-center text-light">{t("Carregando...")}</div>
          )}
          <button type="submit" className="btn btn-custom mt-3">
            {t("Entrar")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
