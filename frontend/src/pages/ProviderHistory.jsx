import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ProviderHistory() {

  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    const res = await api.get("/services/provider");
    const completed = res.data.filter(w => w.status === "COMPLETED");
    setWorks(completed);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="SERVICE_PROVIDER" />

      <div style={{
        marginLeft: "260px",
        padding: "40px",
        width: "100%"
      }}>

        <h1>Past Work</h1>

        {works.map(work => (

          <div key={work._id} style={cardStyle}>
            <h2>{work.title}</h2>
            <p>{work.description}</p>
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