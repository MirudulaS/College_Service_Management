import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ProviderDashboard() {
  const [services, setServices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  const startService = async (id) => {
    await api.put(`/services/${id}/start`);
    fetchServices();
  };

  const completeService = async (id) => {
    await api.put(`/services/${id}/complete`);
    fetchServices();
  };

  const assigned = services.filter(s => s.status === "ASSIGNED").length;
  const inProgress = services.filter(s => s.status === "IN_PROGRESS").length;
  const completed = services.filter(s => s.status === "COMPLETED").length;

  const getStatusColor = (status) => {
    switch (status) {
      case "ASSIGNED":
        return "#3b82f6";
      case "IN_PROGRESS":
        return "#9333ea";
      case "COMPLETED":
        return "#16a34a";
      default:
        return "#6b7280";
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#ffffff" }}>
      <Sidebar role={user.role} />

      <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
        <h1>Service Provider Dashboard</h1>

        {/* Summary Section */}
        <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
          <div className="stat-card">Assigned: {assigned}</div>
          <div className="stat-card">In Progress: {inProgress}</div>
          <div className="stat-card">Completed: {completed}</div>
        </div>

        {/* Service List */}
        <div style={{ marginTop: "40px" }}>
          {services.length === 0 ? (
            <p>No services available.</p>
          ) : (
            services.map(service => (
              <div
                key={service._id}
                style={{
                  background: "#f9fafb",
                  padding: "20px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>
                  Status:{" "}
                  <span
                    style={{
                      background: getStatusColor(service.status),
                      color: "#fff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontSize: "12px"
                    }}
                  >
                    {service.status}
                  </span>
                </p>

                {/* Action Buttons */}
                {service.status === "ASSIGNED" && (
                  <button
                    onClick={() => startService(service._id)}
                    style={{
                      marginRight: "10px",
                      padding: "8px 16px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Start
                  </button>
                )}

                {service.status !== "COMPLETED" && (
                  <button
                    onClick={() => completeService(service._id)}
                    style={{
                      padding: "8px 16px",
                      background: "#16a34a",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Complete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}