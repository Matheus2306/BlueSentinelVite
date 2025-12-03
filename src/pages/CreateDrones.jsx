import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { Navigate } from "react-router";
import { token, apiFetch } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";
import { getApi } from "../js/GetFetch";
import { fetchUser } from "../js/user";

const CreateDrones = () => {
  // --- Proteção Admin ---

  const [isOpen, setIsOpen] = useState(false);
  const [model, setModel] = useState("");
  const [mac, setMac] = useState("");
  const [role, setRole] = useState([]);
  const [user, setUser] = useState(null);
  const [dronesList, setDronesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchedTerm, setSearchedTerm] = useState("");
  const cache = useRef(new Map());


  useEffect(() => {
    if (!token) {
      return;
    }
    // Fetch user info if token is set
    try {
      fetchUser(token).then((userData) => {
        if (userData) {
          setRole(userData.roles || []);
          setUser(userData);
          console.log(userData.roles);
        }
      });
    } catch (e) {
      console.error("Failed to fetch user info", e);
    }
    // carregar lista de drones
    void refreshDronesList();
  }, []);

  const refreshDronesList = async () => {
    try {
      const drones = await getApi("/api/DroneFabris");
      setDronesList(Array.isArray(drones) ? drones : []);
    } catch (err) {
      console.error("Erro ao carregar lista de DroneFabris:", err);
      setDronesList([]);
    }
  };

  // Busca por modelo usando GET na API. Se searchTerm for vazio, recarrega a lista completa.
  const searchByModel = async (term) => {
  const raw = (term ?? searchTerm)?.trim();
  if (!raw) {
    setSearchedTerm("");
    void refreshDronesList();
    return;
  }

  // normaliza chave do cache
  const q = raw.toLowerCase();
  setSearchedTerm(raw);

  // --- CHECK DO CACHE ---
  if (cache.current.has(q)) {
    console.log("⚡ Resultado vindo do cache!");
    setDronesList(cache.current.get(q));
    return;
  }

  setIsSearching(true);
  try {
    const path = `/api/DroneFabris?modelo=${encodeURIComponent(raw)}`;
    const result = await getApi(path);
    const items = Array.isArray(result) ? result : [];

    const filtered = items.filter((d) => {
      const modelName =
        d?.modelo ??
        d?.model ??
        d?.modeloDrone ??
        d?.nomeModelo ??
        d?.modelo_nome ??
        null;

      return (
        typeof modelName === "string" &&
        modelName.trim().toLowerCase() === q
      );
    });

    // --- SALVAR NO CACHE ---
    cache.current.set(q, filtered);

    setDronesList(filtered);
  } catch (err) {
    console.error("Erro na busca por modelo:", err);
    setDronesList([]);
  } finally {
    setIsSearching(false);
  }
};


  // inicializa campos do modal
  function initNewDrone() {
    setModel("");
    setMac("");
  }

  function openModal() {
    // Verifica se o usuário é admin antes de abrir o modal
    const roles = user?.roles || role || [];
    const isAdmin = Array.isArray(roles)
      ? roles.some((r) => String(r).toLowerCase().includes("admin"))
      : String(roles).toLowerCase().includes("admin");

    if (!isAdmin) {
      alert("Apenas administradores podem cadastrar drones.");
      return;
    }

    initNewDrone();
    setIsOpen(true);
  }

  async function handleSave() {
    // Rechecar permissão antes de salvar (caso a sessão/mudança tenha ocorrido)
    const roles = user?.roles || role || [];
    const isAdmin = Array.isArray(roles)
      ? roles.some((r) => String(r).toLowerCase().includes("admin"))
      : String(roles).toLowerCase().includes("admin");

    if (!isAdmin) {
      alert("Ação não permitida. Usuário sem permissão de administrador.");
      setIsOpen(false);
      return;
    }

    const payload = { modelo: model, mac: mac };
    console.log("Criar drone:", payload);

    try {
      const res = await apiFetch(`${BASE_URLLocal}/api/DroneFabris`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(message || `Falha ao criar drone (${res.status})`);
      }

      // opcional: resposta com o recurso criado
      const created = await res.json().catch(() => null);
      console.log("Drone :", created || payload);
      setIsOpen(false);

      alert("Drone cadastrado com sucesso.");
      // atualizar lista após criar
      void refreshDronesList();
    } catch (err) {
      console.error("Erro ao cadastrar drone:", err);
    } finally {
      // limpar campos
      setModel("");
      setMac("");
    }
  }

  const handleDeleteDrone = async (id) => {
    try {
      const res = await apiFetch(`${BASE_URLLocal}/api/DroneFabris/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const message = await res.text().catch(() => "");
        throw new Error(message || `Falha ao deletar drone (${res.status})`);
      }

      void refreshDronesList();
    } catch (err) {
      console.error("Erro ao deletar drone:", err);
      alert(`Erro ao deletar drone: ${err.message || err}`);
    }
  };

  return (
    <>
      {/* Página disponível; controle de abertura/salvamento do modal bloqueia não-admins */}
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
      {/* Lista de drones cadastrados (vinda da API) */}
      <div className="container p-2 my-3 leaflet-control-layers-scrollbar ">
        <div className="overflow-x-scrollcard bg-dark text-light p-3 shadow-sm">
          <h4 className="mb-3">Drones Cadastrados</h4>
          {/* Barra de pesquisa por modelo */}
          <form
            className="mb-3"
            onSubmit={(e) => {
              e.preventDefault();
              void searchByModel();
            }}
          >
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Buscar por modelo..."
                aria-label="Buscar por modelo"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-light"
                type="submit"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                ) : (
                  "Buscar"
                )}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSearchTerm("");
                  void refreshDronesList();
                }}
              >
                Limpar
              </button>
            </div>
          </form>
          {dronesList.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center">
              <span className="text-black-50">
                {searchedTerm
                  ? `Nenhum drone encontrado para "${searchedTerm}"`
                  : "Nenhum drone cadastrado"}
              </span>
            </div>
          ) : (
            <div className="d-flex flex-column mt-2">
              {/* Lista scrollável usando Bootstrap list-group e um contêiner com max-height e overflow */}
              <div
                className="list-group bg-dark text-light"
                style={{ maxHeight: "360px", overflowY: "auto" }}
              >
                {dronesList.map((d, idx) => {
                  const mac =
                    d?.mac ??
                    d?.enderecoMac ??
                    d?.macAddress ??
                    d?.endereco_mac ??
                    d?.mac_address;
                  // modelo pode vir em diferentes propriedades dependendo da API
                  const modelName =
                    d?.modelo ??
                    d?.model ??
                    d?.modeloDrone ??
                    d?.nomeModelo ??
                    d?.modelo_nome ??
                    null;
                  // status can be provided in multiple forms: boolean, string ('Ativo'), or 'ligado'
                  const rawStatus =
                    d?.status ??
                    d?.ligado ??
                    d?.ativo ??
                    d?.isActive ??
                    d?.connected ??
                    d?.linked;
                  let statusLabel = "Desconhecido";
                  if (typeof rawStatus === "string") {
                    statusLabel =
                      rawStatus === "Ativo" ||
                      rawStatus.toLowerCase() === "true" ||
                      rawStatus.toLowerCase() === "ligado"
                        ? "Ligado"
                        : "Desligado";
                  } else if (typeof rawStatus === "boolean") {
                    statusLabel = rawStatus ? "Ligado" : "Desligado";
                  } else if (typeof rawStatus === "number") {
                    statusLabel = rawStatus === 1 ? "Ligado" : "Desligado";
                  }

                  return (
                    <div
                      key={mac ?? `drone-${idx}`}
                      className="list-group-item list-group-item-action bg-dark text-light d-flex justify-content-between align-items-center"
                    >
                      <div className="d-flex flex-column">
                        <span className="fs-6">Modelo: {modelName ?? "—"}</span>
                        <span className="fs-6">Endereço MAC: {mac ?? "—"}</span>
                        <span className="fs-6">Status: {statusLabel}</span>
                      </div>
                      <div>
                        {mac && (
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDeleteDrone(mac)}
                          >
                            Deletar
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
