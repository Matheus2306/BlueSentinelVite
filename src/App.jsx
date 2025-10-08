import "./App.css";
import Logo from "./img/logo-fundo.png";
import Header from "./components/Header.jsx";
import submarineContent from "./img/submarine-content.png";
import submarine from "./img/submarine.png";
import lixo from "./img/lixo.png";

function App() {
  return (
    <>
      <Header />
      <>
        <div id="image-container">
          <img src={Logo} className="logo" alt="Blue Sentinel Logo" />
          <div id="page-content">
            <div className="hero-center">
              <h2>Mude o Futuro</h2>
              <p className="lead">Faça a diferença para um planeta melhor</p>
              <p className="lead">
                Maior controle sobre o lixo em rios e lagos
              </p>
            </div>
          </div>
        </div>

        <section id="info-section">
          <div className="info-inner">
            <h3>Combate à urgência</h3>
            <p>
              Observa-se uma crescente urgência em relação ao meio ambiente,
              especialmente quanto à necessidade de reduzir o acúmulo de
              resíduos nos rios. A correta remoção e destinação desses materiais
              contribui para prolongar a vida útil dos corpos hídricos, além de
              prevenir enchentes e minimizar os impactos socioambientais
              decorrentes da poluição.
            </p>
          </div>
        </section>

        <section id="subsection">
          <div className="subsection-inner">
            <img
              src={submarineContent}
              alt="Imagem de um rio poluído com lixo"
              className="subsection-image justify-content-center align-items-center d-flex"
            />
          </div>
        </section>

        <section id="drone-section">
          <div className="drone-inner bg-transparent">
            <p>
              O drone integra tecnologias como modelagem 3D, sistemas embarcados
              e propulsão subaquática ao cuidado ambiental, resultando em um
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
          <h2>Impacto Principal 🍃</h2>
          <p>
            <p className="fw-bold">Redução de Resíduos: </p>O drone subaquático
            coleta resíduos sólidos de forma contínua, diminuindo a poluição e
            melhorando a qualidade da água.
            <br />
            <p className="fw-bold">Contribuição com ODS: </p>Atende diretamente
            aos Objetivos de Desenvolvimento Sustentável da ONU: ODS 6 (Água
            limpa), ODS 11 (Cidades sustentáveis), ODS 12 (Consumo responsável)
            e ODS 14 (Vida na água).
            <br />
            <p className="fw-bold">Engajamento: </p>Promove a participação de
            escolas, cooperativas e voluntários, fortalecendo a conscientização
            ambiental.
          </p>
        </div>
        <br />
        <div id="card-selection-2">
          <div>
            <h2>Utilização</h2>
            <p>
              <p className="fw-bold">Coleta Inteligente: </p>O drone
              subaquático, equipado com motores e bolsão de ar para
              estabilidade, navega pelos rios recolhendo resíduos sólidos.
            </p>
            <img src={submarine} alt="Drone subaquático" className="w-100" />
            <p>
              <p className="fw-bold">Destinação Sustentável: </p>O material
              coletado é encaminhado para reciclagem, reinserindo resíduos na
              cadeia produtiva e reduzindo o impacto ambiental.
            </p>
            <img src={lixo} alt="Resíduo sólido" className="w-100" />
          </div>
        </div>
        <br />
        <div id="last-card">
          <p className="text-center">
            Mergulhe com a gente nessa missão e ajude a transformar nossos rios.
          </p>
          <button id="last-card-button">Saiba Mais</button>
        </div>
        <br />
        <br />
        <br />
      </>
    </>
  );
}

export default App;
