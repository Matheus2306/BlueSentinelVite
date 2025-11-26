import React, { useEffect, useState } from "react";
import CardHeader from "../components/CardHeader";
import CardBody from "../components/CardBody";
import { apiFetch } from "../js/Token";
import { BASE_URLLocal } from "../js/Urls";
import { send } from "../js/Auxilio";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() =>  {
    apiFetch(BASE_URLLocal + "/api/drones/getDroneUser", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching drones:", error);
      });
  }, [send]);
  
  return (
    <div className="vh-100 w-100 d-flex align-items-center justify-content-center">
      <div className="w-50 bg-dark-subtle h-50 py-2 px-3 rounded-2">
        <CardHeader title="Drones Vinculados" btnText="Vincular" />
        {data== ""? <div className="d-flex align-items-center justify-content-center h-75">
          <span className="fs-4 text-black-50">Nenhum drone vinculado</span>
        </div> : 
        <CardBody data={data} />}
      </div>
    </div>
  );
};

export default Dashboard;
