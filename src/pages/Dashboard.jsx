import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Header from "../components/Header";

const Dashboard = () => {
  const [timer, setTimer] = useState("00:00:00");

  useEffect(() => {
    let sec = 0;
    const interval = setInterval(() => {
      sec++;
      const h = String(Math.floor(sec / 3600)).padStart(2, "0");
      const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      setTimer(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const barData = [
    { name: "Figma", info1: 30, info2: 70, info3: 20 },
    { name: "Sketch", info1: 40, info2: 80, info3: 55 },
    { name: "XD", info1: 60, info2: 20, info3: 45 },
    { name: "PS", info1: 50, info2: 90, info3: 60 },
  ];

  const lineData = [
    { name: "Figma", 2020: 25, 2021: 80, 2022: 50 },
    { name: "Sketch", 2020: 45, 2021: 55, 2022: 35 },
    { name: "XD", 2020: 70, 2021: 90, 2022: 75 },
    { name: "PS", 2020: 50, 2021: 40, 2022: 65 },
    { name: "AI", 2020: 35, 2021: 20, 2022: 55 },
  ];

  const dronePositions = [
    [-23.636, -46.056],
    [-23.642, -46.051],
    [-23.648, -46.058],
    [-23.662, -46.071],
    [-23.675, -46.061],
    [-23.68, -46.049],
    [-23.685, -46.075],
  ];


  return (
    <>
      <Header />
      <div className="dashboard-page">
        <div className="top-info d-flex justify-content-around align-items-center">
          <div className="text-center">
            <h4>{("TempoDeAtividade")}</h4>
            <h1 className="fw-bold">{timer}</h1>
          </div>
          <div className="text-center">
            <h4>{("QuantidadeEmAtiva")}</h4>
            <h1 className="fw-bold">7</h1>
          </div>
          <div className="map-box">
            <MapContainer
              center={[-23.65, -46.06]}
              zoom={12}
              scrollWheelZoom={false}
              className="map"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {dronePositions.map((pos, index) => (
                <CircleMarker key={index} center={pos} radius={6} color="red">
                  <Popup>Drone #{index + 1}</Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
        </div>

        <div className="charts-container">
          <div className="chart-box">
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.2)"
                />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Bar dataKey="info1" fill="#8d8dff" />
                <Bar dataKey="info2" fill="#ff9b9b" />
                <Bar dataKey="info3" fill="#80d4ff" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-box">
            <ResponsiveContainer width="100%" height={420}>
              <LineChart data={lineData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(255,255,255,0.2)"
                />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="2020"
                  stroke="#ff9b9b"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="2021"
                  stroke="#80d4ff"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="2022"
                  stroke="#b28bff"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
