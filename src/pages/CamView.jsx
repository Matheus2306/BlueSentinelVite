import React from "react";
import image from "../img/camImage.png";
import { useNavigate } from "react-router";

const CamView = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="camView" className="d-flex justify-content-center">
        <div
          className="cam-container"
          style={{ position: "relative", width: "100%", height: "100%" }}
        >
          <img src={image} alt="CamView" />
          {/* ícone sobreposto no canto superior esquerdo */}
          <button
            className="icon-btn cam-back-btn"
            aria-label="Voltar"
            title="Voltar"
            type="button"
            onClick={() => navigate(-1)}
          >
            <i className="bi bi-arrow-left" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default CamView;
