import { useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function RaiseRequest() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [locationType, setLocationType] = useState("HOSTEL");
  const [block, setBlock] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [category, setCategory] = useState("Electrical");
  const [priority, setPriority] = useState("Medium");
  const [image, setImage] = useState(null);

  const submitRequest = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("locationType", locationType);
    formData.append("block", block);
    formData.append("roomNumber", roomNumber);
    formData.append("category", category);
    formData.append("priority", priority);

    if (image) {
      formData.append("image", image);
    }

    await api.post("/services", formData);

    alert("Request submitted successfully");

    setTitle("");
    setDescription("");
    setBlock("");
    setRoomNumber("");
    setImage(null);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    marginBottom: "18px"
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "280px",
          width: "100%",
          minHeight: "100vh",
          background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
          padding: "40px"
        }}
      >
        <div
          style={{
            width: "720px",
            margin: "40px auto",
            background: "#ffffff",
            padding: "50px",
            borderRadius: "20px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.15)",
            border: "1px solid #e5e7eb"
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "700",
              marginBottom: "30px",
              color: "#1e293b"
            }}
          >
            Raise Service Request
          </h2>

          <form onSubmit={submitRequest}>
            <input
              type="text"
              placeholder="Complaint Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={inputStyle}
            />

            <textarea
              placeholder="Describe the issue clearly..."
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={inputStyle}
            />

            <select
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              style={inputStyle}
            >
              <option value="HOSTEL">Hostel</option>
              <option value="ACADEMIC">Academic Block</option>
            </select>

            <input
              type="text"
              placeholder="Block / Department"
              value={block}
              onChange={(e) => setBlock(e.target.value)}
              style={inputStyle}
            />

            <input
              type="text"
              placeholder="Room Number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              style={inputStyle}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={inputStyle}
            >
              <option>Electrical</option>
              <option>Plumbing</option>
              <option>Cleaning</option>
              <option>Internet</option>
              <option>Other</option>
            </select>

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              style={inputStyle}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>

            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ marginBottom: "20px" }}
            />

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                background: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: "10px",
                boxShadow: "0 8px 20px rgba(37,99,235,0.35)"
              }}
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}