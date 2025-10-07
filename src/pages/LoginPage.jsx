import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Alterações salvas com sucesso!");
  };

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("userData");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFormData((f) => ({
          ...f,
          nome: parsed.nome || "",
          email: parsed.email || "",
        }));
      }
    } catch (err) {
      // ignore malformed data
      console.error("Failed to parse userData from localStorage", err);
    }
  }, []);

  return (
    <div className="profile-edit-container d-flex align-items-center justify-content-center">
      <div className="profile-card p-4 shadow-lg position-relative text-center">
        <div className="profile-icon d-flex align-items-center justify-content-center mx-auto">
          <i className="bi bi-person-fill fs-1 text-white"></i>
        </div>

        <h2 className="title mt-5 mb-4">alterações</h2>

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div className="text-start">
            <label className="form-label text-light">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              className="form-control input-custom"
            />
          </div>

          <div className="text-start">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control input-custom"
            />
          </div>

          <div className="text-start">
            <label className="form-label text-light">Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className="form-control input-custom"
            />
          </div>

          <button
            type="submit"
            className="btn btn-custom mt-3"
            onClick={() => navigate(-1)}
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
