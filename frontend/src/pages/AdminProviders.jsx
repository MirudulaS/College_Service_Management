import { useEffect, useState } from "react";
import api from "../services/api";
import AdminSidebar from "../components/AdminSidebar";

export default function AdminProviders() {

  const [providers, setProviders] = useState([]);
  const [requests, setRequests] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState({});
  const [selectedSlot, setSelectedSlot] = useState({});

  const slots = [
    "09:00 AM",
    "11:00 AM",
    "02:00 PM",
    "04:00 PM"
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    const providerRes = await api.get("/users/providers");
    setProviders(providerRes.data);

    const serviceRes = await api.get("/services");

    setServices(serviceRes.data);

    const pending = serviceRes.data.filter(
      s => s.status === "REQUESTED"
    );

    setRequests(pending);
  };

  const getAvailableSlots = (providerId) => {

    const bookedSlots = services
      .filter(
        s =>
          s.assignedTo?._id === providerId &&
          s.status !== "COMPLETED"
      )
      .map(s => s.scheduledTime);

    return slots.filter(slot => !bookedSlots.includes(slot));
  };

  const assignWork = async (providerId) => {
    try {

      const requestId = selectedRequest[providerId];
      const slot = selectedSlot[providerId];

      if (!requestId || !slot) {
        alert("Select request and slot");
        return;
      }

      await api.put(`/services/${requestId}/assign`, {
        providerId: providerId,
        scheduledTime: slot
      });

      fetchData();

    } catch (error) {
      console.error("Assignment error:", error);
      alert("Assignment failed");
    }
  };

  return (
    <div style={{ display: "flex" }}>

      <AdminSidebar />

      <div style={{ marginLeft: "280px", padding: "40px", width: "100%" }}>

        <h2 style={{ marginBottom: "30px" }}>
          Service Providers
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "25px"
          }}
        >

          {providers.map((p) => (

            <div
              key={p._id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
              }}
            >

              <h3>{p.name}</h3>

              <p><b>Email:</b> {p.email}</p>

              <p><b>Specialization:</b> {p.specialization}</p>

              {/* SELECT REQUEST */}

              <select
                value={selectedRequest[p._id] || ""}
                onChange={(e) =>
                  setSelectedRequest({
                    ...selectedRequest,
                    [p._id]: e.target.value
                  })
                }
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
              >
                <option value="">Select Request</option>

                {requests.map((req) => (
                  <option key={req._id} value={req._id}>
                    {req.issueId} - {req.title}
                  </option>
                ))}

              </select>

              {/* SELECT SLOT */}

              <select
                value={selectedSlot[p._id] || ""}
                style={{ width: "100%", padding: "10px", marginTop: "10px" }}
                onChange={(e) =>
                  setSelectedSlot({
                    ...selectedSlot,
                    [p._id]: e.target.value
                  })
                }
              >
                <option value="">Select Slot</option>

                {getAvailableSlots(p._id).map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}

              </select>

              <button
                style={{
                  marginTop: "15px",
                  padding: "10px 16px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer"
                }}
                onClick={() => assignWork(p._id)}
              >
                Assign Work
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}