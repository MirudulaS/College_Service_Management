import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ProviderDashboard() {

  const [services, setServices] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/provider");
      setServices(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const startWork = async (id) => {
    try {
      await api.put(`/services/${id}/start`);
      fetchServices();
    } catch (err) {
      console.error(err);
    }
  };

  const completeWork = async (id) => {
    try {
      await api.put(`/services/${id}/complete`);
      fetchServices();
    } catch (err) {
      console.error(err);
      alert("Failed to complete work");
    }
  };

  const assigned = services.filter((s) => s.status === "ASSIGNED");
  const inProgress = services.filter((s) => s.status === "IN_PROGRESS");
  const completed = services.filter((s) => s.status === "COMPLETED");

  return (
    <div style={{ display: "flex" }}>

      <Sidebar role="SERVICE_PROVIDER" />

      <div
        style={{
          marginLeft: "280px",
          padding: "40px",
          width: "100%",
          background: "#f1f5f9",
          minHeight: "100vh"
        }}
      >

        {location.pathname === "/provider" && (
          <Section
            title="Scheduled Work"
            data={assigned}
            button="Start Work"
            action={startWork}
          />
        )}

        {location.pathname === "/provider/work" && (
          <Section
            title="Work In Progress"
            data={inProgress}
            button="Complete Work"
            action={completeWork}
          />
        )}

        {location.pathname === "/provider/history" && (
          <Section
            title="Past Work / Completed Work"
            data={completed}
            button={null}
          />
        )}

      </div>

    </div>
  );
}

function Section({ title, data = [], button, action }) {

  return (
    <div style={{ marginBottom: "40px" }}>

      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        {title}
      </h2>

      {data.length === 0 && (
        <p>No records found</p>
      )}

      {data.map((req) => (

        <div
          key={req._id}
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "16px",
            marginBottom: "15px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
          }}
        >

          <h3>{req.title}</h3>

          <p>{req.description}</p>

          <p><strong>Category:</strong> {req.category}</p>
          <p><strong>Priority:</strong> {req.priority}</p>

          <p>
            <strong>Scheduled Time:</strong>{" "}
            {req.scheduledTime || "Not Assigned"}
          </p>

          <p>
            <strong>User:</strong> {req.createdBy?.name}
          </p>

          {button && req._id && (
            <button
              onClick={() => action(req._id)}
              style={{
                marginTop: "10px",
                padding: "10px 18px",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              {button}
            </button>
          )}

        </div>

      ))}

    </div>
  );
}