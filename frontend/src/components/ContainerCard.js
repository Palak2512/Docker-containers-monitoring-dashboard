


import React from "react";
import { motion } from "framer-motion";
import { Card } from "react-bootstrap";

const ContainerCard = ({ container }) => {
  const statusColor = {
  color: container.State === "running" ? "#2ecc71" : "#ff7675", // green / soft red
  fontWeight: "500",
  fontSize: "1rem"
};


  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      style={{ height: "100%" }}
    >
      <Card
        style={{
          background: "rgba(20, 25, 40, 0.85)",  // Darker background with opacity
          border: "1.5px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
          borderRadius: "15px",
          color: "#f0f0f0", // Light text
          minHeight: "180px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <h5
          style={{
            fontWeight: "600",
            marginBottom: "10px",
            overflowWrap: "break-word",
            fontSize: "1.25rem",
            color: "#e1eaff",
          }}
        >Container name:&nbsp;&nbsp;
          { container.Names[0]}
        </h5>

        <p style={{ fontWeight: "500", fontSize: "1rem", color: statusColor.color }}>
          {container.State} - {container.Status}
        </p>

        <p style={{ marginTop: "auto", fontSize: "0.9rem", fontWeight: "600", color: "#ffffff" }}>
          Image: <span style={{ fontWeight: "400" }}>{container.Image}</span>
        </p>
      </Card>
    </motion.div>
  );
};

export default ContainerCard;
