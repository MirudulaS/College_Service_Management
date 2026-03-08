import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminRequests() {

  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />

      <div style={{
        marginLeft: "260px",
        padding: "40px",
        width: "100%"
      }}>

        <h1>Past Requests</h1>

        {services
          .filter(service => service.status === "COMPLETED")
          .map(service => (

          <div key={service._id} style={cardStyle}>

            <h2>{service.title}</h2>
            <p>{service.description}</p>

            <p><strong>User:</strong> {service.createdBy?.name}</p>
            <p><strong>Status:</strong> {service.status}</p>

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