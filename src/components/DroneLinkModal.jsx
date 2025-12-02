import { useRef, useState } from "react";
import { apiFetch } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";

const DroneLinkModal = ({ modalId = "droneLinkModal", onLinkDrone }) => {
  const [formData, setFormData] = useState({
    serialCode: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const modalRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const mac = formData.serialCode.trim();
    const localizacao = formData.location.trim();

    if (!mac || !localizacao) {
      setError("Por favor, preencha todos os campos.");
      return;
    }

    const payload = {
      localizacao,
      tempoEmMili: 0,
      status: false,
    };

    try {
      setLoading(true);
      setError(null);
      const response = await apiFetch(
        `${BASE_URLLocal}/api/drones/vincular?mac=${encodeURIComponent(mac)}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        setError(errorData);
        setFormData({ serialCode: "", location: "" });
        return;
      }

      if (onLinkDrone) {
        onLinkDrone({ mac, ...payload });
      }

      setFormData({ serialCode: "", location: "" });

      if (modalRef.current && typeof window !== "undefined") {
        const modalInstance =
          window.bootstrap?.Modal.getInstance(modalRef.current) ||
          (window.bootstrap?.Modal
            ? new window.bootstrap.Modal(modalRef.current)
            : null);

        modalInstance?.hide();
      }
    } catch (error) {
      setFormData({ serialCode: "", location: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id={modalId}
      ref={modalRef}
      tabIndex="-1"
      aria-labelledby={`${modalId}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id={`${modalId}Label`}>
              Vincular drone
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <p className="mb-3 text-muted">
                Informe o codigo ou identificador unico do drone que deseja
                associar.
              </p>
              {error && (
                // agenda ocultar a mensagem após 5 segundos (5000ms)
                (setTimeout(() => {
                  const el = document.getElementById(`${modalId}Error`);
                  if (el) el.style.display = "none";
                }, 5000),
                <div
                  id={`${modalId}Error`}
                  className="alert alert-danger"
                  role="alert"
                >
                  {error}
                </div>)
              )}
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id={`${modalId}Serial`}
                  placeholder="Codigo do drone"
                  value={formData.serialCode}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      serialCode: event.target.value,
                    })
                  }
                  required
                />
                <label htmlFor={`${modalId}Serial`}>Mac</label>
              </div>
              <div className="form-floating mt-3">
                <input
                  type="text"
                  className="form-control"
                  id={`${modalId}Location`}
                  placeholder="Localizacao do drone"
                  value={formData.location}
                  onChange={(event) =>
                    setFormData({
                      ...formData,
                      location: event.target.value,
                    })
                  }
                  required
                />
                <label htmlFor={`${modalId}Location`}>Localizacao</label>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" className="btn btn-success">
                Vincular
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DroneLinkModal;
