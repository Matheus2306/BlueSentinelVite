import "./App.css";
import Logo from "./img/logo-fundo.png";
import Header from "./components/Header.jsx";
import ImagemSub from "./img/imagemSub.jpeg";

function App() {
  return (
    <>
      <Header />
      <div id="image-container">
        <img src={Logo} className="logo" alt="Blue Sentinel Logo" />
        <div id="page-content">
          <div className="hero-center">
            <h2>Mude o Futuro</h2>
            <p className="lead">Faça a diferença para um planeta melhor</p>
            <p className="lead">Maior controle sobre o lixo em rios e lagos</p>
          </div>
        </div>
      </div>

      <section id="info-section">
        <div className="info-inner">
          <h3>Combate à urgência</h3>
          <p>
            Observa-se uma crescente urgência em relação ao meio ambiente,
            especialmente quanto à necessidade de reduzir o acúmulo de resíduos
            nos rios. A correta remoção e destinação desses materiais contribui
            para prolongar a vida útil dos corpos hídricos, além de prevenir
            enchentes e minimizar os impactos socioambientais decorrentes da
            poluição.
          </p>
        </div>
      </section>

      <section id="subsection">
        <div className="subsection-inner">
          <img
            src={ImagemSub}
            alt="Imagem de um rio poluído com lixo"
            className="subsection-image"
          />
        </div>
      </section>

      <section id="drone-section">
        <div className="drone-inner">
          <p>
            O drone integra tecnologias como modelagem 3D, sistemas embarcados e
            propulsão subaquática ao cuidado ambiental, resultando em um
            protótipo de drone submarino capaz de coletar resíduos nos rios e
            contribuir para sua preservação.
          </p>
          <p>
            Visando uma intervenção de baixo custo e fácil utilização pela
            comunidade.
          </p>
        </div>
      </section>
      <div id="card-selection">
        <h2 className="section-title">Utilização</h2>
        <h3>Drone de Limpeza</h3>
        <p>
          Um drone submarino projetado para coletar lixo em rios e lagos,
          utilizando tecnologia de ponta para monitoramento e remoção de
          resíduos.
        </p>
      </div>
    </>
  );
}

export default App;
