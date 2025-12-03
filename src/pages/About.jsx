// src/pages/About.jsx
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "../components/Header";

const About = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <>
      <Header />
      <div className="about-page text-light">
        {/* HERO */}
        <section className="hero-section text-center py-5" data-aos="fade-down">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3 p-4">Sobre Nós</h1>
            <p className="lead mx-auto w-75">
              acreditamos que o meio ambiente não precisa sofrer com a poluição,
              por isso criamos o Blue Sentinel
            </p>
          </div>
        </section>

        {/* QUEM SOMOS */}
        <section className="py-5" data-aos="fade-up">
          <div className="container">
            <h2 className="text-center mb-4 ">Quem Somos</h2>
            <p className="text-center mx-auto w-75">
              Somos um grupo de apaixonados por tecnologia que acredita que o
              futuro da web é rápido, bonito e acessível. Nosso objetivo é a
              coleta de lixo vizando principalmente no cuidado ao meio ambiente,
              usando de um submarino com braços roboticos feito de componentes
              reciclados para a coleta de lixo de rios.
            </p>
          </div>
        </section>

        {/* NOSSA HISTÓRIA */}
        <section className="timeline-section py-5 bg-gradient-dark">
          <div className="container">
            <h2 className="text-center mb-5" data-aos="fade-up">
              Nossa História
            </h2>
            <div className="timeline">
              <div className="timeline-item" data-aos="fade-right">
                <span className="bi bi-lightbulb-fill"></span>
                <div>
                  <h5>2024</h5>
                  <p>
                    O projeto nasceu de uma ideia entre amigos desenvolvedores.
                  </p>
                </div>
              </div>
              <div className="timeline-item" data-aos="fade-left">
                <span className="bi bi-rocket-takeoff-fill"></span>
                <div>
                  <h5>2025</h5>
                  <p>
                    Primeira versão lançada com o foco em performance e estilo.
                  </p>
                </div>
              </div>
              <div className="timeline-item" data-aos="fade-right">
                <span className="bi bi-stars"></span>
                <div>
                  <h5>Futuro</h5>
                  <p>
                    Expandir de rios para oceanos e mares para aumentar a
                    sustentabilidade e diminuir a poluição nas águas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* O QUE FAZEMOS */}
        <section className="py-5" data-aos="zoom-in">
          <div className="container">
            <h2 className="text-center mb-5">O Que Fazemos</h2>
            <div className="row g-4 text-center">
              <div className="col-md-3" data-aos="fade-up" data-aos-delay="100">
                <i className="bi bi-code-slash display-5 mb-3"></i>
                <h5>Front-End</h5>
                <p>Visualização dinâmica de dados do usuário cadastrado</p>
              </div>
              <div className="col-md-3" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-palette-fill display-5 mb-3"></i>
                <h5>Design</h5>
                <p>UX/UI que entrega experiências incríveis tanto mobile quanto para desktop.</p>
              </div>
              <div className="col-md-3" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-plug-fill display-5 mb-3"></i>
                <h5>APIs</h5>
                <p>Integrações sólidas e seguras com back-ends modernos.</p>
              </div>
              <div className="col-md-3" data-aos="fade-up" data-aos-delay="400">
                <i className=" bi bi-cloud-arrow-up-fill display-5 mb-3"></i>
                <h5>Cloud</h5>
                <p>Soluções escaláveis e prontas pro futuro.</p>
              </div>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="py-5 bg-gradient-dark" data-aos="fade-up">
          <div className="container text-center">
            <h2 className="mb-4">Nossos Valores</h2>
            <div className="d-flex flex-wrap justify-content-center gap-4">
              <span className=" badge bg-primary-subtle text-dark p-3 fs-6">
                Inovação
              </span>
              <span className="badge bg-primary-subtle text-dark p-3 fs-6">
                Transparência
              </span>
              <span className="badge bg-primary-subtle text-dark p-3 fs-6">
                Simplicidade
              </span>
              <span className="badge bg-primary-subtle text-dark p-3 fs-6">
                Comunidade
              </span><span className="badge bg-primary-subtle text-dark p-3 fs-6">
                Sustentabilidade
              </span>
              <span className="badge bg-primary-subtle text-dark p-3 fs-6">
                Meio Ambiente
              </span>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <section className="py-5 text-center" data-aos="zoom-in">
          <div className="container">
            <h3 className="fw-bold mb-3">Quer saber mais?</h3>
            <p className="lead mb-4">
              Entre em contato e bora construir o futuro juntos.
            </p>
            <a href="/contato" className="btn btn-light btn-lg">
              <i className="bi bi-envelope-fill me-2"></i> Fale Conosco
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
