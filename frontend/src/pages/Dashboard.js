


import React, { useEffect, useState } from "react";
import axios from "axios";
import ContainerCard from "../components/ContainerCard";
import ContainerTable from "../components/ContainerTable";
import ResourceChart from "../components/ResourceChart";
import "../App.css";
import "animate.css";

const Dashboard = () => {
  const [containers, setContainers] = useState([]);

  const fetchContainers = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:3002/api/containers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContainers(res.data);
    } catch (err) {
      console.error("Error fetching containers:", err);
    }
  };

  const handleAction = async (id, action) => {
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `http://localhost:3002/api/containers/${id}/${action}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchContainers(); // refresh list
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
    }
  };

  useEffect(() => {
    fetchContainers();
    const interval = setInterval(fetchContainers, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-vh-100 p-4"
      style={{
       background:"linear-gradient(135deg, #e0eafc, #cfdef3)",
        color: "#222",
      }}
    >
       <h2
        className="text-center fw-bold animate__animated animate__fadeInDown"
        style={{
          fontSize: "2.5rem",
          color: "#34495e",
          letterSpacing: "1px",
          paddingBottom: "0.3rem",
          maxWidth: "600px",
          margin: "auto",
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        }}
      >
         Docker Monitoring Dashboard
      </h2>

      <p
        className="text-center mb-5"
        style={{
          color: "#7f8c8d",
          fontSize: "1.1rem",
          fontStyle: "italic",
          maxWidth: "500px",
          margin: "0 auto 40px auto",
        }}
      >
        Get clear insight into your Docker containers
      </p>

      {/* Chart Section */}
      <div className="d-flex justify-content-center mb-4">
        <ResourceChart data={{ used: 30, total: 100 }} label="CPU Usage" />
      </div>

      {/* Container Cards */}
      <div className="row g-4 justify-content-center">
  {containers.map((c, idx) => (
    <div className="col-12 col-sm-6 col-md-4 " key={idx}>
      <ContainerCard container={c} />
    </div>
  ))}
</div>


      {/* Table */}
      <div className="mt-5 shadow-sm bg-white rounded p-4">
        <ContainerTable containers={containers} onAction={handleAction} />
      </div>
    </div>
  );
};

export default Dashboard;
