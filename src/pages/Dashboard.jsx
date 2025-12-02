import React, { useCallback, useEffect, useRef, useState } from "react";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";
import { apiFetch, token } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";
import { getApi } from "../js/GetFetch";
import { fetchUser } from "../js/user";
import NotFound from "./NotFound";
import Header from "../components/Header";
import CardDash from "../components/CardDash";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [user, setUser] = useState(null);
  const [adminSearchTerm, setAdminSearchTerm] = useState("");
  const adminSearchCache = useRef(new Map());

  const refreshDrones = useCallback(async () => {
    try {
      const drones = await getApi("/api/drones/getDroneUser");
      setData(drones);
    } catch (error) {
      console.error("Error fetching drones:", error);
    }
  }, []);

  const refreshAdminDrones = useCallback(async () => {
    try {
      const drones = await getApi("/api/drones");
      const normalized = Array.isArray(drones) ? drones : [];
      setAdminData(normalized);
      adminSearchCache.current.set("", normalized);
    } catch (error) {
      console.error("Error fetching admin drones:", error);
    }
  }, []);

  const loadAdminDrones = useCallback(
    async (searchTerm, { force = false } = {}) => {
      const termSource =
        typeof searchTerm === "string" ? searchTerm : adminSearchTerm;
      const normalized = termSource.trim();
      const cacheKey = normalized.toLowerCase();

      if (!normalized) {
        if (force) {
          adminSearchCache.current.delete("");
        }
        await refreshAdminDrones();
        return;
      }

      if (!force && adminSearchCache.current.has(cacheKey)) {
        setAdminData(adminSearchCache.current.get(cacheKey));
        return;
      }

      try {
        const drones = await getApi(
          `/api/Drones/getByUserName/${encodeURIComponent(normalized)}`
        );
        const result = Array.isArray(drones) ? drones : [];
        adminSearchCache.current.set(cacheKey, result);
        setAdminData(result);
      } catch (error) {
        console.error("Error fetching admin drones by user name:", error);
        adminSearchCache.current.delete(cacheKey);
        setAdminData([]);
      }
    },
    [adminSearchTerm, refreshAdminDrones]
  );

  const handleLinkDrone = useCallback(async () => {
    adminSearchCache.current.clear();
    await refreshDrones();
    await loadAdminDrones(undefined, { force: true });
  }, [refreshDrones, loadAdminDrones]);

  useEffect(() => {
    refreshAdminDrones();
    refreshDrones();
    fetchUser(token).then((user) => {
      setUser(user);
    });
    if (!token) {
      setUser(null);
    }
  }, [refreshDrones, refreshAdminDrones, token]);

  const handleDeleteDrone = async (id) => {
    try {
      adminSearchCache.current.clear();
      await apiFetch(`${BASE_URLLocal}/api/Drones/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await refreshDrones();
      await loadAdminDrones(undefined, { force: true });
    } catch (error) {
      console.error("Error deleting drone:", error);
    }
  };

  const handleAdminSearchChange = useCallback(
    (value) => {
      setAdminSearchTerm(value);
      void loadAdminDrones(value);
    },
    [loadAdminDrones]
  );

  return (
    <>
      {user ? (
        <div className="vh-100 w-100 d-flex flex-column align-items-center justify-content-center">
          <Header />
          <div className="d-flex w-100 h-100 mt-5">
            <div className="w-50 bg-dark-subtle h-75 py-2 mx-2 px-3 rounded-2">
              <CardHeader
                title="Drones Vinculados"
                btnText="Vincular"
                onLinkDrone={handleLinkDrone}
                noneInput={true}
              />
              {data.length === 0 ? (
                <div className="d-flex align-items-center justify-content-center h-75">
                  <span className="fs-4 text-black-50">
                    Nenhum drone vinculado
                  </span>
                </div>
              ) : (
                <CardBody
                  data={data}
                  type="cardDrone"
                  handleDeleteDrone={handleDeleteDrone}
                />
              )}
            </div>
            <CardDash data={data} />
          </div>
          {user.roles.includes("Admin") && (
            <div className="h-100 w-100 d-flex flex-column align-items-center justify-content-center mt-4">
              <h2 className="mt-2 mb-2">Área Administrativa</h2>
              <div className="w-50 bg-dark-subtle h-75 py-2 mx-2 px-3 rounded-2">
                <CardHeader
                  title="Drones Vinculados à pessoas"
                  noneBtn={true}
                  searchValue={adminSearchTerm}
                  onSearchChange={handleAdminSearchChange}
                  searchPlaceholder="Buscar por usuário"
                />
                {adminData.length === 0 ? (
                  <div className="d-flex align-items-center justify-content-center h-75">
                    <span className="fs-4 text-black-50">
                      Nenhum drone vinculado a pessoas
                    </span>
                  </div>
                ) : (
                  <CardBody
                    data={adminData}
                    handleDeleteDrone={handleDeleteDrone}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <NotFound />
      )}
    </>
  );
};

export default Dashboard;
