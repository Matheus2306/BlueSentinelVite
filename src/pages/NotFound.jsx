import React from "react";

const NotFound = () => {
  return (
    <main className="not-found-page">
      <div className="not-found-content">
        <p className="not-found-eyebrow">Erro 404</p>
        <h1>Página não encontrada</h1>
        <p className="not-found-description">
          O endereço que você procurou não existe ou foi movido. Verifique a URL
          ou volte para a página inicial para continuar navegando.
        </p>
        <a href="/" className="btn btn-light not-found-action">
          Voltar para o início
        </a>
      </div>
    </main>
  );
};

export default NotFound;
