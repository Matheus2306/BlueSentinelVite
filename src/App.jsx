import "./App.css";
import Logo from "./img/logo-fundo.png";
import Header from "./components/Header.jsx";
import submarineContent from "./img/submarine-content.png";
import submarine from "./img/submarine.png";
import lixo from "./img/lixo.png";
import { useTranslation } from "react-i18next";

function App() {
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

        <section id="info-section">
          <div className="info-inner">
            <h3>{t("InfoTitle")}</h3>
            <p>{t("InfoParagraph")}</p>
          </div>
        </section>

        <section id="subsection">
          <div className="subsection-inner">
            <img
              src={submarineContent}
              alt={t("ImageAlt")}
              className="subsection-image justify-content-center align-items-center d-flex"
            />
          </div>
        </section>

        <section id="drone-section">
          <div className="drone-inner bg-transparent">
            <p>{t("ColetaInteligente")}</p>
            <p>{t("DestinacaoSustentavel")}</p>
          </div>
        </section>

        <div id="card-selection">
          <h2>{t("ImpactoPrincipal")} 🍃</h2>
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
          <div>
            <h2>{t("Utilizacao")}</h2>
            <div>
              <div className="fw-bold">{t("ReducaoResiduos")}</div>
              <div>{t("ColetaInteligente")}</div>
            </div>
            <img src={submarine} alt={t("SubmarineAlt")} className="w-100" />
            <div>
              <div className="fw-bold">{t("DestinacaoSustentavel")}</div>
            </div>
            <img src={lixo} alt={t("LixoAlt")} className="w-100" />
          </div>
        </div>
        <br />
        <div id="last-card">
          <div className="text-center">
            <p>{t("MergulheComAGente")}</p>
            <button id="last-card-button">{t("SaibaMais")}</button>
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
