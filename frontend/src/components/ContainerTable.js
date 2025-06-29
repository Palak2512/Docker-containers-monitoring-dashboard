

import React from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const getStatusBadge = (state) => {
  const styles = {
    running: { background: "#2ecc71", color: "#fff" },
    exited: { background: "#e74c3c", color: "#fff" },
    created: { background: "#f1c40f", color: "#222" },
    paused: { background: "#3498db", color: "#fff" },
  };

  return (
    <span
      style={{
        ...styles[state] || { background: "#7f8c8d", color: "#fff" },
        padding: "4px 10px",
        borderRadius: "12px",
        fontSize: "0.85rem",
        fontWeight: "500",
        textTransform: "capitalize",
      }}
    >
      {state}
    </span>
  );
};

const ContainerTable = ({ containers, refreshContainers }) => {
  // const handleAction = async (id, action) => {
  //   try {
  //     await axios.post(`http://localhost:3002/api/containers/${action}/${id}`);
  //     alert(`Container ${action}ed successfully`);
  //     refreshContainers();
  //   } catch (err) {
  //     console.error(err);
  //     alert(`Failed to ${action} container`);
  //   }
  // };
  const handleAction = async (id, action) => {
  try {
    const token = localStorage.getItem("token");
    await axios.post(
      `http://localhost:3002/api/containers/${action}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(`Container ${action}ed successfully`);
    refreshContainers();
  } catch (err) {
    console.error(err);
    alert(`Failed to ${action} container`);
  }
};


  return (
    <div
      className="container mt-5 animate__animated animate__fadeIn"
      style={{
        padding: "20px",
        backdropFilter: "blur(10px)",
        background: "rgba(255, 255, 255, 0.1)",
        borderRadius: "16px",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      }}
    >
      <h4
        className="mb-4 text-center"
        style={{
          fontWeight: "600",
          fontSize: "1.5rem",
          color: "#2c3e50",
        }}
      >
        🧾 Container Details
      </h4>

      <div className="table-responsive">
        <Table
          bordered
          hover
          className="align-middle"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderRadius: "12px",
            overflow: "hidden",
           
          }}
        >
          <thead style={{ backgroundColor: "rgba(44, 62, 80, 0.9)", color: "#fff" }}>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Status</th>
              <th>State</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {containers.map((c, i) => (
              <tr
                key={i}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
                }}
              >
                <td style={{ fontWeight: "500", color: "#2c3e50" }}>{c.Names[0]}</td>
                <td style={{ color: "#34495e" }}>{c.Image}</td>
                <td style={{ color: "#34495e" }}>{c.Status}</td>
                <td>{getStatusBadge(c.State)}</td>
                <td style={{ textAlign: "center" }}>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <Button
                      variant="success"
                      size="sm"
                      style={{ borderRadius: "20px", minWidth: "70px" }}
                      onClick={() => handleAction(c.Id, "start")}
                      disabled={c.State === "running"}
                    >
                      Start
                    </Button>
                    <Button
                      variant="warning"
                      size="sm"
                      style={{
                        borderRadius: "20px",
                        minWidth: "70px",
                        color: "#222",
                        fontWeight: "500",
                      }}
                      onClick={() => handleAction(c.Id, "stop")}
                      disabled={c.State !== "running"}
                    >
                      Stop
                    </Button>
                    <Button
                      variant="info"
                      size="sm"
                      style={{
                        borderRadius: "20px",
                        minWidth: "80px",
                        color: "#fff",
                        fontWeight: "500",
                      }}
                      onClick={() => handleAction(c.Id, "restart")}
                      disabled={c.State !== "running"}
                    >
                      Restart
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ContainerTable;
