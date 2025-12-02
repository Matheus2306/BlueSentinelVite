import React from "react";

const itemCardDrone = ({ drone, handleDeleteDrone }) => {
  return (
    <div className="color p-2 rounded mx-2 shadow-sm d-flex justify-content-between align-items-center">
      <div className="d-flex flex-column">
        <span className="fs-6">Usuário: {drone.usuario.nome}</span>
        <span className="fs-6">Modelo do Drone: {drone.droneFabri.modelo}</span>
      </div>
      <div className="d-flex justify-content-end align-items-center">
        <span
          onClick={() => handleDeleteDrone(drone.droneId)}
          className="bg-danger rounded-circle px-2 py-1 text-white mx-3"
          role="button"
        >
          <i className="bi bi-trash-fill fs-4"></i>
        </span>
      </div>
    </div>
  );
};

export default itemCardDrone;
