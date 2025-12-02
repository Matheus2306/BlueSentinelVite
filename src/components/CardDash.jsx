import React from "react";

const CardDash = (data) => {
  const dronesAtivos = data.data.filter((drone) => drone.status === "Ativo");
  const locais = data.data.map((drone) => drone.localizacao);
  const localMaisConcentrado = locais
    .sort(
      (a, b) =>
        locais.filter((v) => v === a).length -
        locais.filter((v) => v === b).length
    )
    .pop();
  return (
    <div className="h-75 w-50 d-flex flex-column bg-dark-subtle rounded-2 mx-2 p-2">
      <h3 className="text-black-50">Controlar</h3>
      <div className="d-flex flex-column gap-3 mt-4">
        <div className="d-flex gap-3">
          <span className="fs-5 text-secondary">
            Drones em ação:{" "}
            <span className="fs-4 text-success">{dronesAtivos.length}</span>
          </span>
          <span className="fs-5 text-secondary">
            Drones possuidos{" "}
            <span className="fs-4 text-success">{data.data.length}</span>
          </span>
        </div>
        <span className="fs-5 text-secondary">
          Local com maior concentração de drones:{" "}
          <span className="fs-4 text-success">{localMaisConcentrado}</span>
        </span>
      </div>
    </div>
  );
};

export default CardDash;
