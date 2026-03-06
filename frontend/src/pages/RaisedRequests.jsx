import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function RaisedRequests() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/my");
      setServices(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "220px",
          width: "100%",
          background: "#e6f0ff",
          minHeight: "100vh",
          padding: "25px 40px",
        }}
      >
        {/* Heading shifted more right */}
        <h1
          style={{
            marginBottom: "18px",
            marginLeft: "25px",
          }}
        >
          Raised Requests
        </h1>

        {services.map((service) => (
          <div
            key={service._id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.06)",
              marginBottom: "14px",
              position: "relative",
            }}
          >
            {/* Status Badge */}
            <div
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                padding: "6px 16px",
                borderRadius: "20px",
                fontSize: "12px",
                fontWeight: "600",
                backgroundColor:
                  service.status === "REQUESTED"
                    ? "#fee2e2"
                    : service.status === "IN_PROGRESS"
                    ? "#fef3c7"
                    : service.status === "COMPLETED"
                    ? "#dcfce7"
                    : "#e5e7eb",
                color:
                  service.status === "REQUESTED"
                    ? "#dc2626"
                    : service.status === "IN_PROGRESS"
                    ? "#d97706"
                    : service.status === "COMPLETED"
                    ? "#16a34a"
                    : "#374151",
              }}
            >
              {service.status}
            </div>

            <h3 style={{ marginBottom: "6px" }}>{service.title}</h3>

            <p style={{ marginBottom: "8px", color: "#555" }}>
              {service.description}
            </p>

            <p style={{ fontSize: "14px", color: "#666" }}>
              Location: {service.locationType}
            </p>

            {service.block && (
              <p style={{ fontSize: "14px", color: "#666" }}>
                Block: {service.block}
              </p>
            )}

            {service.roomNumber && (
              <p style={{ fontSize: "14px", color: "#666" }}>
                Room: {service.roomNumber}
              </p>
            )}

            <p style={{ fontSize: "14px", color: "#666" }}>
              Category: {service.category}
            </p>

            <p style={{ fontSize: "14px", color: "#666" }}>
              Priority: {service.priority}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}