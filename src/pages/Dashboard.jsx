import React, { useCallback, useEffect, useState } from "react";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";
import { apiFetch, token } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";
import { getApi } from "../js/GetFetch";
import { fetchUser } from "../js/user";
import NotFound from "./NotFound";
import Header from "../components/Header";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  const refreshDrones = useCallback(async () => {
    try {
      const drones = await getApi("/api/drones/getDroneUser");
      setData(drones);
    } catch (error) {
      console.error("Error fetching drones:", error);
    }
  }, []);

  useEffect(() => {
    refreshDrones();
    fetchUser(token).then((user) => {
      setUser(user);
    });
  }, [refreshDrones]);

  const handleDeleteDrone = async (id) => {
    try {
      await apiFetch(`${BASE_URLLocal}/api/Drones/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      await refreshDrones();
    } catch (error) {
      console.error("Error deleting drone:", error);
    }
  };

  return (
   <>
   {user ? ( <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
    <Header />
      <div className="w-50 bg-dark-subtle h-50 py-2 px-3 rounded-2">
        <CardHeader
          title="Drones Vinculados"
          btnText="Vincular"
          onLinkDrone={refreshDrones}
        />
        {data.length === 0 ? (
          <div className="d-flex align-items-center justify-content-center h-75">
            <span className="fs-4 text-black-50">Nenhum drone vinculado</span>
          </div>
        ) : (
          <CardBody data={data} handleDeleteDrone={handleDeleteDrone} />
        )}
      </div>
    </div>): (<NotFound/>)}
   </>  
  );
};

export default Dashboard;
