import React, { useState } from "react";
import { useNavigate } from "react-router";
import logoHeader from "../img/logoHeader.png";
import { useTranslation } from "react-i18next";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple client-side "registration": create a fake id and store it along with form data
    const id = `user_${Date.now()}`;
    const userData = { id, nome: form.nome, email: form.email };
    localStorage.setItem("userId", id);
    localStorage.setItem("userData", JSON.stringify(userData));
    // After "registering" go to LoginPage
    navigate("/login");
  };

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div
        id="card-register"
        className="register-card position-relative text-center p-4"
      >
        {/* top circular logo */}
        <div className="top-logo d-flex justify-content-center">
          <div className="logo-circle d-flex align-items-center justify-content-center">
            <img src={logoHeader} alt="logo" />
          </div>
        </div>

        <button
          type="button"
          className="btn btn-link text-white position-absolute back-btn"
          onClick={() => navigate(-1)}
          aria-label={t("Voltar")}
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "4rem" }}></i>
        </button>

        <h5 className="card-title text-center mt-3 mb-4">{t("Cadastrar")}</h5>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">{t("Nome")}</label>
            <input
              type="text"
              className="form-control"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("Email")}</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">{t("Senha")}</label>
            <input
              type="password"
              className="form-control"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">{t("ConfirmarSenha")}</label>
            <input
              type="password"
              className="form-control"
              name="confirmar"
              value={form.confirmar}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark px-5 rounded-pill register-submit"
              onClick={() => navigate("/")}
            >
              {t("Cadastrar")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
