import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ProviderWork() {

  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetchWork();
  }, []);

  const fetchWork = async () => {
    const res = await api.get("/services/provider");
    setWorks(res.data);
  };

  const updateStatus = async (id, status) => {

    if (status === "IN_PROGRESS") {
      await api.put(`/services/${id}/start`);
    }

    if (status === "COMPLETED") {
      await api.put(`/services/${id}/complete`);
    }

    fetchWork();
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="SERVICE_PROVIDER" />

      <div style={{
        marginLeft: "260px",
        padding: "40px",
        width: "100%"
      }}>

        <h1>Scheduled Work</h1>

        {works.map(work => (

          <div key={work._id} style={cardStyle}>

            <h2>{work.title}</h2>
            <p>{work.description}</p>

            <button
              onClick={() => updateStatus(work._id, "IN_PROGRESS")}
            >
              Start Work
            </button>

            <button
              onClick={() => updateStatus(work._id, "COMPLETED")}
            >
              Complete
            </button>

          </div>

        ))}

      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "24px",
  borderRadius: "16px",
  marginBottom: "20px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.12)"
};