import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const [services, setServices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  const completeService = async (id) => {
    await api.put(`/services/${id}/complete`);
    fetchServices();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      <Sidebar role={user.role} />

      <div style={{ marginLeft: "220px", padding: "40px", width: "100%" }}>
        <h1>Admin Dashboard</h1>

        <div style={{ marginTop: "30px" }}>
          {services.length === 0 ? (
            <p>No service requests found.</p>
          ) : (
            services.map(service => (
              <div
                key={service._id}
                style={{
                  background: "#fff",
                  padding: "20px",
                  borderRadius: "8px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                }}
              >
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p>Status: {service.status}</p>
                <p>Raised By: {service.createdBy?.name}</p>

                {service.status !== "COMPLETED" && (
                  <button
                    onClick={() => completeService(service._id)}
                    style={{
                      marginTop: "10px",
                      padding: "8px 16px",
                      background: "#2563eb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer"
                    }}
                  >
                    Mark Completed
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