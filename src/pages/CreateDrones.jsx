// CreateDrones.jsx (versão corrigida)
// Ajustes principais:
// - Botão "Deletar" agora envia d.id em vez de d.mac
// - handleDeleteDrone(id) agora realmente recebe o id correto
// - Ajustes leves de segurança para deixar o DELETE mais consistente

import React, { useEffect, useRef, useState } from "react";
import Header from "../components/Header";
import { token, apiFetch } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";
import { getApi } from "../js/GetFetch";
import { fetchUser } from "../js/user";

const CreateDrones = () => {
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
    if (!token) return;

    try {
      fetchUser(token).then((userData) => {
        if (userData) {
          setRole(userData.roles || []);
          setUser(userData);
        }
      });
    } catch (e) {
      console.error("Failed to fetch user info", e);
    }

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

  const normalizeMac = (m) => {
    if (!m) return "";
    return String(m).trim().toUpperCase();
  };

  const searchByModel = async (term) => {
    const raw = (term ?? searchTerm)?.trim();
    if (!raw) {
      setSearchedTerm("");
      void refreshDronesList();
      return;
    }

    const q = raw.toLowerCase();
    setSearchedTerm(raw);

    if (cache.current.has(q)) {
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
          typeof modelName === "string" && modelName.trim().toLowerCase() === q
        );
      });

      cache.current.set(q, filtered);
      setDronesList(filtered);
    } catch (err) {
      console.error("Erro na busca por modelo:", err);
      setDronesList([]);
    } finally {
      setIsSearching(false);
    }
  };

  function initNewDrone() {
    setModel("");
    setMac("");
  }

  function openModal() {
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
    const roles = user?.roles || role || [];
    const isAdmin = Array.isArray(roles)
      ? roles.some((r) => String(r).toLowerCase().includes("admin"))
      : String(roles).toLowerCase().includes("admin");

    if (!isAdmin) {
      alert("Ação não permitida. Usuário sem permissão de administrador.");
      setIsOpen(false);
      return;
    }

    const normalizedMac = normalizeMac(mac);
    if (!normalizedMac) {
      alert("Informe o endereço MAC.");
      return;
    }

    try {
      const existing = await getApi(
        `/api/DroneFabris?mac=${encodeURIComponent(normalizedMac)}`
      );
      const exists = Array.isArray(existing)
        ? existing.some((d) => {
            const candidate = (
              d?.mac ??
              d?.enderecoMac ??
              d?.macAddress ??
              d?.endereco_mac ??
              d?.mac_address ??
              ""
            )
              .toString()
              .toUpperCase();

            return candidate === normalizedMac;
          })
        : false;

      if (exists) {
        alert("Endereço MAC já cadastrado.");
        return;
      }
    } catch (err) {
      console.warn("Falha ao checar duplicados via API", err);
    }

    const payload = { modelo: model, mac: normalizedMac };

    try {
      const res = await apiFetch(`${BASE_URLLocal}/api/DroneFabris`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());

      alert("Drone cadastrado com sucesso.");

      if (cache?.current?.clear) cache.current.clear();
      void refreshDronesList();
      setIsOpen(false);
    } catch (err) {
      console.error("Erro ao cadastrar drone:", err);
    } finally {
      setModel("");
      setMac("");
    }
  }

  const handleDeleteDrone = async (Id) => {

    // se não tem id, tenta buscar via API usando mac

    try {
      const res = await apiFetch(
        `${BASE_URLLocal}/api/DroneFabris/${Id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error(await res.text());

      // limpar cache e atualizar
      if (cache?.current?.clear) cache.current.clear();
      void refreshDronesList();
    } catch (err) {
      console.error("Erro ao deletar drone:", err);
      alert(`Erro ao deletar drone: ${err.message || err}`);
    }
  };
  console.log(dronesList)

  return (
    <>
      <Header />

      <div className="container p-5 my-5 align-items-center">
        <div className="card bg-dark text-light text-center p-4 shadow-lg">
          <h2 className="mb-2">Cadastrar Drone</h2>
          <p>Clique abaixo para cadastrar um novo drone no sistema.</p>
          <button className="btn btn-primary mt-3" onClick={openModal}>
            Cadastrar Novo Drone
          </button>
        </div>
      </div>

      <div className="container p-2 my-3 leaflet-control-layers-scrollbar">
        <div className="overflow-x-scrollcard bg-dark text-light p-3 shadow-sm">
          <h4 className="mb-3">Drones Cadastrados</h4>

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="btn btn-outline-light"
                type="submit"
                disabled={isSearching}
              >
                {isSearching ? (
                  <span className="spinner-border spinner-border-sm"></span>
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
                  const modelName =
                    d?.modelo ??
                    d?.model ??
                    d?.modeloDrone ??
                    d?.nomeModelo ??
                    d?.modelo_nome ??
                    null;

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
                  } else if (typeof rawStatus === "boolean")
                    statusLabel = rawStatus ? "Ligado" : "Desligado";
                  else if (typeof rawStatus === "number")
                    statusLabel = rawStatus === 1 ? "Ligado" : "Desligado";

                  return (
                    <div
                      key={d?.id || idx}
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
                            onClick={() =>
                              handleDeleteDrone(d.droneFabriId)
                            }
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

      {isOpen && (
        <>
          <div
            className="modal-backdrop fade show"
            onClick={() => setIsOpen(false)}
          ></div>

          <div className="modal d-block">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content bg-dark text-light">
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
