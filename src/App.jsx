import "./App.css";
// Bootstrap imports: CSS and bundled JS (components like modals/popovers)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Logo from "./img/logo-fundo.png";
import Header from "./components/Header.jsx";
import submarineContent from "./img/submarine-content.png";
import submarine from "./img/submarine.png";
import lixo from "./img/lixo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

function App() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <>
        <div id="image-container">
          <img src={Logo} className="logo" alt="Blue Sentinel Logo" />
          <div id="page-content">
            <div className="hero-center">
              <h2>{t("MudeOFuturo")}</h2>
              <p className="lead">{t("Fa%C3%A7aADiferenca")}</p>
              <p className="lead">{t("QuantidadeEmAtiva")}</p>
            </div>
          </div>
        </div>

        <section id="info-section" className=" fs-4">
          <div className="info-inner">
            <h3>{t("InfoTitle")}</h3>
            <p>{t("InfoParagraph")}</p>
          </div>
        </section>

        <section
          id="subsection"
          className=" d-flex justify-content-center align-items-center mx-auto w-75 h-100 bg-transparent"
        >
          <div className="subsection-inner w-100">
            <img
              src={submarineContent}
              alt={t("ImageAlt")}
              className="subsection-image"
            />
          </div>
        </section>

        <section id="drone-section">
          <div className="drone-inner bg-transparent">
            <p>{t("ColetaInteligente")}</p>
            <p>{t("DestinacaoSustentavel")}</p>
          </div>
        </section>

        <div id="card-selection" className="fs-5">
          <h2 className="fs-3 text-center">{t("ImpactoPrincipal")} 🍃</h2>
          <div>
            <div className="fw-bold">{t("ReducaoResiduos")}</div>
            <div>{t("ColetaInteligente")}</div>
            <br />
            <div className="fw-bold">{t("ContribuicaoODS")}</div>
            <div>{t("InfoParagraph")}</div>
            <br />
            <div className="fw-bold">{t("Engajamento")}</div>
            <div>{t("MergulheComAGente")}</div>
          </div>
        </div>
        <br />
        <div id="card-selection-2">
          <div className="w-75 mx-auto h-75">
            <h2 className="fs-4">{t("Utilizacao")}</h2>
            <div>
              <div className="fw-bold fs-5">{t("ReducaoResiduos")}</div>
              <div className="fs-5">{t("ColetaInteligente")}</div>
            </div>
            <img src={submarine} alt={t("SubmarineAlt")} className="w-100" />
            <div>
              <div className="fw-bold fs-5">{t("DestinacaoSustentavel")}</div>
            </div>
            <img src={lixo} alt={t("LixoAlt")} className="w-100" />
          </div>
        </div>
        <br />
        <div id="last-card" className="w-50 mx-auto p-4 text-center fs-4">
          <div className="text-center">
            <p>{t("MergulheComAGente")}</p>
            {/* Use Bootstrap button classes for sizing and rounded look */}
            <button
              className="btn btn-dark btn-lg rounded-pill px-5 py-3"
              onClick={() => navigate("/about")}
            >
              {t("SaibaMais")}
            </button>
          </div>
        </div>
        <br />
        <br />
        <br />
      </>
    </>
  );
}

export default App;
