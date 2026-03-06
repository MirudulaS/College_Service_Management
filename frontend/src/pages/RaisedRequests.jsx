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

  const openImage = (image) => {
    const win = window.open();
    win.document.write(`
      <html>
        <head>
          <title>Request Photo</title>
          <style>
            body{
              margin:0;
              display:flex;
              justify-content:center;
              align-items:center;
              height:100vh;
              background:#e6f0ff;
            }
            img{
              max-width:90%;
              max-height:90%;
              border-radius:12px;
              box-shadow:0 10px 25px rgba(0,0,0,0.25);
            }
          </style>
        </head>
        <body>
          <img src="http://localhost:5000/uploads/${image}" />
        </body>
      </html>
    `);
  };

  const rowStyle = {
    display: "flex",
    alignItems: "center",
    fontSize: "18px",
    marginBottom: "8px",
  };

  const labelStyle = {
    width: "120px",
    fontWeight: "600",
  };

  const colonStyle = {
    width: "20px",
  };

  const valueStyle = {
    marginLeft: "10px",
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "260px",
          width: "100%",
          background: "#e6f0ff",
          minHeight: "100vh",
          padding: "25px 40px",
        }}
      >
        <h1
          style={{
            marginBottom: "18px",
            marginLeft: "25px",
            fontSize: "34px",
          }}
        >
          Raised Requests
        </h1>

        {services.map((service) => (
          <div
            key={service._id}
            style={{
              background: "#ffffff",
              padding: "24px",
              borderRadius: "16px",

              /* SHADOW ONLY FOR FULL COMPONENT */
              boxShadow: "0 12px 30px rgba(0,0,0,0.12)",

              marginBottom: "16px",
            }}
          >
            {/* TITLE + STATUS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <h2 style={{ fontSize: "24px", margin: 0 }}>
                {service.title}
              </h2>

              <div
                style={{
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
            </div>

            <p style={{ marginBottom: "16px", fontSize: "18px", color: "#555" }}>
              {service.description}
            </p>

            <div style={rowStyle}>
              <span style={labelStyle}>Location</span>
              <span style={colonStyle}>:</span>
              <span style={valueStyle}>{service.locationType}</span>
            </div>

            {service.block && (
              <div style={rowStyle}>
                <span style={labelStyle}>Block</span>
                <span style={colonStyle}>:</span>
                <span style={valueStyle}>{service.block}</span>
              </div>
            )}

            {service.roomNumber && (
              <div style={rowStyle}>
                <span style={labelStyle}>Room</span>
                <span style={colonStyle}>:</span>
                <span style={valueStyle}>{service.roomNumber}</span>
              </div>
            )}

            <div style={rowStyle}>
              <span style={labelStyle}>Category</span>
              <span style={colonStyle}>:</span>
              <span style={valueStyle}>{service.category}</span>
            </div>

            <div style={rowStyle}>
              <span style={labelStyle}>Priority</span>
              <span style={colonStyle}>:</span>
              <span style={valueStyle}>{service.priority}</span>
            </div>

            {service.image && (
              <div style={rowStyle}>
                <span style={labelStyle}>Photo</span>
                <span style={colonStyle}>:</span>
                <span
                  style={{
                    ...valueStyle,
                    color: "#2563eb",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => openImage(service.image)}
                >
                  View Photo
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}