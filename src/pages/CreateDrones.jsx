import React, { useState } from "react";
import Header from "../components/Header";

// page layout container
const pageContainerStyle = {
  minHeight: "calc(100vh - 64px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  boxSizing: "border-box",
};

const CreateDrones = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [droneId, setDroneId] = useState("");
  const [model, setModel] = useState("");
  const [mac, setMac] = useState("");
  const [linked, setLinked] = useState(false);

  // generators
  function generateId() {
    // short unique-ish id using timestamp + random
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
    const payload = {
      id: droneId,
      model,
      mac,
      linked,
    };
    // replace with real API call later
    console.log("Criar drone:", payload);
    setIsOpen(false);
  }

  return (
    <>
      <Header />

      <div style={pageContainerStyle}>
        <div style={cardStyle}>
          <h2 style={{ margin: 0 }}>Criar Drone</h2>
          <p style={{ color: "#555" }}>
            Use o modal para gerar e registrar um novo drone no sistema.
          </p>

          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <button onClick={openModal} style={primaryButtonStyle}>
              Criar novo drone
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div style={backdropStyle} onMouseDown={() => setIsOpen(false)}>
          <div
            style={modalStyle}
            className="drone-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div style={modalHeaderStyle}>
              <h3 style={{ margin: 0 }}>Criar Drone</h3>
              <button
                aria-label="Fechar"
                onClick={() => setIsOpen(false)}
                style={closeButtonStyle}
              >
                ×
              </button>
            </div>

            <div style={formGrid}>
              <div>
                <label style={labelStyle}>Modelo</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    onClick={() => setModel(generateModel())}
                    className="modal-btn modal-btn-secondary"
                  >
                    Gerar
                  </button>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Endereço MAC</label>
                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={mac}
                    onChange={(e) => setMac(e.target.value)}
                    style={inputStyle}
                  />
                  <button
                    onClick={() => setMac(generateMac())}
                    className="modal-btn modal-btn-secondary"
                  >
                    Gerar
                  </button>
                </div>
              </div>
              {/* Buttons row: span full grid width and sit below the two-column fields */}
              <div
                style={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  justifyContent: "center",
                  gap: 12,
                  marginTop: 18,
                }}
              >
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
      )}
    </>
  );
};
const cardStyle = {
  width: 760,
  maxWidth: "95%",
  background: "#fff",
  padding: 24,
  borderRadius: 12,
  boxShadow: "0 10px 30px rgba(15,23,42,0.08)",
  textAlign: "center",
};

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(10,12,20,0.45)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  width: 640,
  maxWidth: "96%",
  background: "#ffffff",
  padding: 18,
  borderRadius: 12,
  boxShadow: "0 18px 50px rgba(2,6,23,0.2)",
  border: "1px solid rgba(15,23,42,0.04)",
};

const modalHeaderStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 14,
};

const closeButtonStyle = {
  border: "none",
  background: "transparent",
  fontSize: 22,
  lineHeight: "18px",
  cursor: "pointer",
  color: "#555",
};

const formGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #e6e9ef",
  marginTop: 6,
  marginBottom: 6,
  boxSizing: "border-box",
  fontSize: 14,
};

const labelStyle = { fontSize: 13, fontWeight: 600, color: "#223" };

const primaryButtonStyle = {
  padding: "10px 16px",
  borderRadius: 10,
  border: "none",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontWeight: 600,
};

export default CreateDrones;
