import React from "react";

const ItemCard = ({ modelo, localizacao, tempoAtividade, status, handleDeleteDrone, Id }) => {
  return (
    <div className="d-flex gap-1 shadow-sm color p-2 rounded mx-2">
      <div className="w-75 d-flex flex-column gap-1 justify-content-between">
        <div className="d-flex justify-content-between">
          <span className="fs-6">Modelo: {modelo}</span>
          <span className="fs-6 mx-3">Localização: {localizacao}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="w-50 fs-6 mb-3">
            Tempo de Atividade(horas): {tempoAtividade == null ? "0" : tempoAtividade}
          </span>
          <span className="fs-6 mx-3">Status: {!status ? "false" : "true"}</span>
        </div>
      </div>
      <div className="d-flex w-25 justify-content-end align-items-center">
        <span onClick={() => handleDeleteDrone(Id)} className="bg-danger rounded-circle px-2 py-1 text-white cursor-pointer mx-3">
          <i className="bi bi-trash-fill fs-4 "></i>
        </span>
      </div>
    </div>
  );
};

export default ItemCard;
