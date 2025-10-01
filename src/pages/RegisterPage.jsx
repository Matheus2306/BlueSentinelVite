import React from "react";
import { useNavigate } from "react-router";
import logoHeader from "../img/logoHeader.png";

const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="register-page d-flex align-items-center justify-content-center">
      <div className="register-card position-relative text-start p-4">
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
          aria-label="Voltar"
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "1.35rem" }}></i>
        </button>

        <h5 className="card-title text-center mt-3 mb-4">Cadastrar</h5>

        <form className="register-form">
          <div className="mb-3">
            <label className="form-label">Nome Completo</label>
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Seu nome"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control rounded-pill"
              placeholder="exemplo@gmail.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Confirmar Senha</label>
            <input
              type="password"
              className="form-control rounded-pill"
              placeholder="••••••••"
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-dark px-5 rounded-pill register-submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
