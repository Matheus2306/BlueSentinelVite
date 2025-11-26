import React, { useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router";

const CreateDrones = () => {
  // --- Proteção Admin ---


  const [isOpen, setIsOpen] = useState(false);
  const [droneId, setDroneId] = useState("");
  const [model, setModel] = useState("");
  const [mac, setMac] = useState("");

  // Gerador de ID
  function generateId() {
    return `DRN-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  }

  function initNewDrone() {
    setDroneId(generateId());
    setModel("");
    setMac("");
  }

  function openModal() {
    initNewDrone();
    setIsOpen(true);
  }

  function handleSave() {
    const payload = { id: droneId, model, mac, linked: false };
    console.log("Criar drone:", payload);
    setIsOpen(false);
  }

  return (
    <>
      <Header />

      {/* Página */}
      <div className={`container py-5 ${isOpen ? "modal-open-custom" : ""}`}>
        <div className="card bg-dark text-light text-center p-4 shadow-lg">
          <h2 className="mb-2">Cadastrar Drone</h2>
          <p>Clique abaixo para cadastrar um novo drone no sistema.</p>
          <button className="btn btn-primary mt-3" onClick={openModal}>
            Cadastrar Novo Drone
          </button>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="modal d-block" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content bg-dark text-light"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header">
                  <h5 className="modal-title">Cadastrar Novo Drone</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setIsOpen(false)}
                  ></button>
                </div>

                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">ID do Drone (gerado)</label>
                    <input
                      type="text"
                      className="form-control"
                      value={droneId}
                      disabled
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Modelo</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: BS-X900"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Endereço MAC</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Ex: AA:BB:CC:DD:EE:FF"
                      value={mac}
                      onChange={(e) => setMac(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                  >
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CreateDrones;
