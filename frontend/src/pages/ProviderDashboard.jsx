import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ProviderDashboard() {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await api.get("/services/provider");
      setServices(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const startWork = async (id) => {
    await api.put(`/services/${id}/start`);
    fetchServices();
  };

  const completeWork = async (id) => {
    await api.put(`/services/${id}/complete`);
    fetchServices();
  };

  const assigned = services.filter(s => s.status === "ASSIGNED");
  const inProgress = services.filter(s => s.status === "IN_PROGRESS");
  const completed = services.filter(s => s.status === "COMPLETED");

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

        {/* Scheduled Work */}
        <Section
          title="Scheduled Work"
          data={assigned}
          button="Start Work"
          action={startWork}
        />

        {/* Work In Progress */}
        <Section
          title="Work In Progress"
          data={inProgress}
          button="Complete Work"
          action={completeWork}
        />

        {/* Completed Work */}
        <Section
          title="Past Work / Completed Work"
          data={completed}
          button={null}
        />

      </div>

    </div>
  );
}

function Section({ title, data, button, action }) {

  return (
    <div style={{ marginBottom: "40px" }}>

      <h2 style={{ fontSize: "28px", marginBottom: "20px" }}>
        {title}
      </h2>

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
            {req.scheduledTime
              ? new Date(req.scheduledTime).toLocaleString()
              : "Not Assigned"}
          </p>

          <p>
            <strong>User:</strong> {req.createdBy?.name}
          </p>

          {button && (
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