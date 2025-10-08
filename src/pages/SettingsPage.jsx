import React from "react";
import { useNavigate } from "react-router";

const SettingsPage = () => {
  const navigate = useNavigate();

  return (
    <div>

<button
          type="button"
          className="btn btn-link text-white position-absolute back-btn"
          onClick={() => navigate(-1)}
          aria-label="Voltar"
        >
          <i className="bi bi-arrow-left" style={{ fontSize: "1.35rem" }}></i>
        </button>

    </div>
  );
};

export default SettingsPage;
