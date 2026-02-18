import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [services, setServices] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user.role === "ADMIN") {
      api.get("/services").then((res) => setServices(res.data));
    } else if (user.role === "USER") {
      api.get("/services/my").then((res) => setServices(res.data));
    } else if (user.role === "SERVICE_PROVIDER") {
      api.get("/services/assigned").then((res) => setServices(res.data));
    }
  }, []);

  return (
    <div className="container">
      <h2>{user.role} Dashboard</h2>

      {services.map((s) => (
        <div key={s._id} className="card">
          <h3>{s.title}</h3>
          <p>{s.description}</p>
          <p>Status: {s.status}</p>
        </div>
      ))}
    </div>
  );
}