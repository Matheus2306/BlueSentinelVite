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
    nascimento: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);
    const doRegister = async () => {
      setLoading(true);
      try {
        const payload = {
          email: form.email,
          password: form.senha,
          nome: form.nome,
          nascimento: form.nascimento
            ? new Date(form.nascimento).toISOString()
            : new Date().toISOString(),
        };

        const res = await fetch("http://bluesentinal.somee.com/Usuario/registrar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          // try read json or text for a helpful message
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

        // success
        setSuccessMessage("Cadastro realizado com sucesso.");
        // navigate after short delay so user can see message
        setTimeout(() => navigate("/login"), 700);
      } catch (err) {
        setErrorMessage(err?.message || String(err));
      } finally {
        setLoading(false);
      }
    };

    doRegister();
  };

  return (
    <div className="d-flex flex-column gap-3 vh-100 align-items-center justify-content-center">
      <div
        id="card-register"
        className="register-card w-25 h-75 text-center p-4"
      >
        {/* top circular logo */}
        <div className="top-logo d-flex justify-content-center">
          <div className="logo-circle d-flex align-items-center justify-content-center">
            <img src={logoHeader} alt="logo" />
          </div>
        </div>
        <div className="d-flex align-items-center ">
          <button
            type="button"
            className="btn btn-link text-white back-btn"
            onClick={() => navigate(-1)}
            aria-label={t("Voltar")}
          >
            <i className="bi bi-arrow-left fs-4"></i>
          </button>
          <h5 className="card-title text-center mt-2 mb-1 mx-5">
            {t("Cadastrar")}
          </h5>
        </div>

        <form
          className="register-form d-flex flex-column gap-3 w-100 h-100 align-items-center"
          onSubmit={handleSubmit}
        >
          <div className="">
            <label className="form-label">{t("Nome")}</label>
            <input
              type="text"
              className="form-control w-100"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Seu nome"
            />
          </div>

          <div className="">
            <label className="form-label">{t("Email")}</label>
            <input
              type="email"
              className="form-control w-100"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="exemplo@gmail.com"
            />
          </div>

          <div className="">
            <label className="form-label">{t("Senha")}</label>
            <input
              type="password"
              className="form-control w-100"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <div className="">
            <label className="form-label">{t("Nascimento")}</label>
            <input
              type="date"
              className="form-control w-100"
              name="nascimento"
              value={form.nascimento}
              onChange={handleChange}
            />
          </div>

          {errorMessage && <div className="text-danger">{errorMessage}</div>}
          {successMessage && (
            <div className="text-success">{successMessage}</div>
          )}

          <div className="d-flex justify-content-center mt-2">
            <button
              type="submit"
              className="btn btn-dark px-5 rounded-pill register-submit"
              disabled={loading}
            >
              {loading ? t("Cadastrando...") : t("Cadastrar")}
            </button>
          </div>
        </form>
      </div>
      <span className="text-info text-decoration-underline" role="button" onClick={() => navigate("/login")}>
        {t("já possui uma conta?")}
      </span>
    </div>
  );
};

export default RegisterPage;
