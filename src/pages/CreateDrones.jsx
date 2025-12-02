import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router";
import { token } from "../js/Token";
import { fetchUser } from "../js/user";

const CreateDrones = () => {
  // --- Proteção Admin ---

  const [isOpen, setIsOpen] = useState(false);
  const [droneId, setDroneId] = useState("");
  const [model, setModel] = useState("");
  const [mac, setMac] = useState("");
  const [role, setRole] = useState([]);

  useEffect(() => {
    if (!token) {
      return;
    }
    // Fetch user info if token is set
    try {
      fetchUser().then((userData) => {
        setRole(userData.roles);
        console.log(role);
      });
    } catch (e) {
      console.error("Failed to fetch user info", e);
    }
  }, [token]);

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
      {role.includes("admin02@admin") && <Navigate to="/" replace={true} />}
      <Header />

      {/* Página */}
      <div
        className={`container p-5 my-5 align-items-center${
          isOpen ? "modal-open-custom" : ""
        }`}
      >
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
                <div className="modal-header bg-gradient-dark">
                  <h5 className="modal-title">Cadastrar Novo Drone</h5>
                  <button
                    className="btn-close btn-close-white"
                    onClick={() => setIsOpen(false)}
                  ></button>
                </div>

                <div className="modal-body bg-gradient">
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
                  <button className="btn btn-primary" onClick={handleSave}>
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
