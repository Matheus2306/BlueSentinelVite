import React, { useState } from "react";
import Header from "../components/Header";

const CreateDrones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [droneId, setDroneId] = useState("");
  const [model, setModel] = useState("");
  const [mac, setMac] = useState("");
  const [linked, setLinked] = useState(false);

  // generators
  function generateId() {
    return `DRN-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  }

  function generateMac() {
    const bytes = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256)
    );
    return bytes
      .map((b) => b.toString(16).padStart(2, "0"))
      .join(":")
      .toUpperCase();
  }

  function generateModel() {
    const models = ["X100", "X200", "Z10", "T1", "A7", "M50"];
    return models[Math.floor(Math.random() * models.length)];
  }

  function initNewDrone() {
    setDroneId(generateId());
    setModel(generateModel());
    setMac(generateMac());
    setLinked(false);
  }

  function openModal() {
    initNewDrone();
    setIsOpen(true);
  }

  function handleSave() {
    const payload = { id: droneId, model, mac, linked };
    console.log("Criar drone:", payload);
    setIsOpen(false);
  }

  return (
    <>
      <Header />

      <div className={`create-drone-page ${isOpen ? "modal-open-custom" : ""}`}>
        <div id="create-drone-card" className="card text-center p-4 bg-dark text-light">
          <h2 style={{ margin: 0 }}>Cadastrar Drone</h2>
          <p className="text-light">
            Clique aqui para cadastrar um novo drone no sistema.
          </p>
          <div className="d-flex justify-content-center mt-3">
            <button onClick={openModal} className="btn btn-primary">
              Cadastrar Novo Drone
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <>
          <div
            className="modal-backdrop-custom"
            onClick={() => setIsOpen(false)}
          />
          <div className="modal-wrapper d-flex justify-content-center align-items-center">
            <div
              className="modal-content-custom drone-modal p-3 bg-dark text-light"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h3 style={{ margin: 0 }}>Cadastrar Novo Drone</h3>
                <button
                  className="btn-close"
                  aria-label="Fechar"
                  onClick={() => setIsOpen(false)}
                />
              </div>

              <div className="row g-3">

                <div className="col-md-6">
                  <label className="form-label">Modelo</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={model}
                      onChange={(e) => setModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="form-label">Endereço MAC</label>
                  <div className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      value={mac}
                      onChange={(e) => setMac(e.target.value)}
                    />
                    <button
                      onClick={() => setMac(generateMac())}
                      className="modal-btn modal-btn-secondary"
                    >
                      Gerar
                    </button>
                  </div>
                </div>

                <div className="col-12 d-flex justify-content-center gap-3 mt-3">
                  <button
                    className="modal-btn modal-btn-secondary"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancelar
                  </button>
                  <button
                    className="modal-btn modal-btn-primary"
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
