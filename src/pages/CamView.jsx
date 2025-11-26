import React from "react";
import image from "../img/camImage.png";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

const CamView = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div id="camView" className="d-flex justify-content-center">
        <div className="cam-container position-relative w-100 h-100">
          <img src={image} alt="CamView" />
          {/* ícone sobreposto no canto superior esquerdo */}
          <button
            className="icon-btn cam-back-btn"
            aria-label={t("Voltar")}
            title={t("Voltar")}
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
