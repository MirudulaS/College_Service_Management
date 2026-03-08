import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminDashboard() {

  const [requests, setRequests] = useState([]);
  const [providers, setProviders] = useState([]);

  const location = useLocation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {

      const serviceRes = await api.get("/services");
      setRequests(serviceRes.data);

      const providerRes = await api.get("/users/providers");
      setProviders(providerRes.data);

    } catch (err) {
      console.error(err);
    }
  };

  const activeRequests = requests.filter(
    (r) => r.status !== "COMPLETED"
  );

  const completedRequests = requests.filter(
    (r) => r.status === "COMPLETED"
  );

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div
        style={{
          marginLeft: "280px",
          width: "calc(100% - 280px)",
          padding: "40px 60px",
          background: "#f1f5f9",
          minHeight: "100vh",
          boxSizing: "border-box"
        }}
      >

        {(location.pathname === "/admin" || location.pathname === "/admin/requests") && (
          <>
            <h2 style={{ marginBottom: "20px", fontSize: "28px" }}>
              Requests
            </h2>

            {(location.pathname === "/admin"
              ? activeRequests
              : completedRequests
            ).map((req) => (

              <div
                key={req._id}
                style={{
                  background: "white",
                  padding: "20px",
                  borderRadius: "14px",
                  marginBottom: "15px",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                  position: "relative"
                }}
              >

                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    textAlign: "right"
                  }}
                >

                  <div
                    style={{
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      backgroundColor: req.scheduledTime ? "#dcfce7" : "#fee2e2",
                      color: req.scheduledTime ? "#16a34a" : "#dc2626",
                      display: "inline-block"
                    }}
                  >
                    {req.scheduledTime ? "SCHEDULED" : "NOT SCHEDULED"}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "18px",
                      fontWeight: "800",
                      color: "#1e293b"
                    }}
                  >
                    {req.issueId}
                  </div>

                </div>

                <h3>{req.title}</h3>

                <p style={{ fontSize: "16px", fontWeight: "600", marginBottom: "10px" }}>
                  Issue ID : {req.issueId}
                </p>

                <div
                  style={{
                    background: "#f8fafc",
                    padding: "15px",
                    borderRadius: "10px",
                    marginTop: "10px",
                    marginBottom: "15px",
                    fontSize: "16px"
                  }}
                >

                  <div style={{ display: "flex", marginBottom: "6px", fontSize: "18px" }}>
                    <span style={{ width: "120px", fontWeight: "600" }}>Name</span>
                    <span style={{ width: "20px" }}>:</span>
                    <span>{req.createdBy?.name}</span>
                  </div>

                  <div style={{ display: "flex", marginBottom: "6px", fontSize: "18px" }}>
                    <span style={{ width: "120px", fontWeight: "600" }}>Email</span>
                    <span style={{ width: "20px" }}>:</span>
                    <span>{req.createdBy?.email}</span>
                  </div>

                  <div style={{ display: "flex", marginBottom: "6px", fontSize: "18px" }}>
                    <span style={{ width: "120px", fontWeight: "600" }}>Department</span>
                    <span style={{ width: "20px" }}>:</span>
                    <span>{req.createdBy?.department}</span>
                  </div>

                  <div style={{ display: "flex", fontSize: "18px" }}>
                    <span style={{ width: "120px", fontWeight: "600" }}>Type</span>
                    <span style={{ width: "20px" }}>:</span>
                    <span>{req.createdBy?.userType}</span>
                  </div>

                </div>

                <p style={{ fontSize: "18px" }}>{req.description}</p>

                <div style={{ display: "flex", marginBottom: "8px", fontSize: "18px" }}>
                  <span style={{ width: "140px", fontWeight: "600" }}>Category</span>
                  <span style={{ width: "20px" }}>:</span>
                  <span>{req.category}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "8px", fontSize: "18px" }}>
                  <span style={{ width: "140px", fontWeight: "600" }}>Priority</span>
                  <span style={{ width: "20px" }}>:</span>
                  <span>{req.priority}</span>
                </div>

                <div style={{ display: "flex", marginBottom: "8px", fontSize: "18px", alignItems: "center" }}>
                  <span style={{ width: "140px", fontWeight: "600" }}>Status</span>
                  <span style={{ width: "20px" }}>:</span>

                  <span
                    style={{
                      padding: "6px 16px",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "700",
                      backgroundColor:
                        req.status === "REQUESTED"
                          ? "#fee2e2"
                          : req.status === "IN_PROGRESS"
                          ? "#fef3c7"
                          : req.status === "COMPLETED"
                          ? "#dcfce7"
                          : "#e5e7eb",
                      color:
                        req.status === "REQUESTED"
                          ? "#dc2626"
                          : req.status === "IN_PROGRESS"
                          ? "#d97706"
                          : req.status === "COMPLETED"
                          ? "#16a34a"
                          : "#374151"
                    }}
                  >
                    {req.status}
                  </span>

                </div>

                <p>
                  <strong>Scheduled Time:</strong>{" "}
                  {req.scheduledTime || "Not Assigned"}
                </p>

              </div>

            ))}
          </>
        )}

        {location.pathname === "/admin/providers" && (
          <>
            <h2 style={{ marginTop: "50px", marginBottom: "20px", fontSize: "28px" }}>
              Service Providers
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "20px",
                width: "100%"
              }}
            >

              {providers.map((p) => (

                <div
                  key={p._id}
                  style={{
                    background: "white",
                    padding: "20px",
                    borderRadius: "14px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                    width: "100%"
                  }}
                >

                  <h3>{p.name}</h3>

                  <p>
                    <strong>Email:</strong> {p.email}
                  </p>

                  <p>
                    <strong>Specialization:</strong> {p.specialization}
                  </p>

                </div>

              ))}

            </div>
          </>
        )}

      </div>

    </div>
  );
}