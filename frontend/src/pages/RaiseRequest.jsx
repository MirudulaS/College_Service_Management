import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function RaiseRequest() {
  const navigate = useNavigate();

  const [formDataState, setFormDataState] = useState({
    title: "",
    description: "",
    locationType: "HOSTEL",
    block: "",
    roomNumber: "",
    category: "Electrical",
    priority: "MEDIUM",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormDataState({ ...formDataState, [name]: files[0] });
    } else {
      setFormDataState({ ...formDataState, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(formDataState).forEach((key) => {
        if (formDataState[key]) {
          formData.append(key, formDataState[key]);
        }
      });

      await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Reset form
      setFormDataState({
        title: "",
        description: "",
        locationType: "HOSTEL",
        block: "",
        roomNumber: "",
        category: "Electrical",
        priority: "MEDIUM",
        image: null,
      });

      navigate("/raised-requests");

    } catch (error) {
      console.error(error);
      alert("Failed to submit request");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "220px",
          width: "100%",
          background: "#e6f0ff",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "700px",
            background: "#ffffff",
            padding: "40px",
            borderRadius: "16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          }}
        >
          <h2 style={{ marginBottom: "30px" }}>
            Raise Service Request
          </h2>

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            required
            value={formDataState.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Describe the issue clearly..."
            rows="4"
            required
            value={formDataState.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          {/* Location Type */}
          <select
            name="locationType"
            value={formDataState.locationType}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          >
            <option value="HOSTEL">Hostel</option>
            <option value="COLLEGE">College</option>
          </select>

          {/* Block */}
          <input
            type="text"
            name="block"
            placeholder="Block / Department"
            value={formDataState.block}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          {/* Room Number */}
          <input
            type="text"
            name="roomNumber"
            placeholder="Room Number"
            value={formDataState.roomNumber}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          />

          {/* Category */}
          <select
            name="category"
            value={formDataState.category}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          >
            <option>Electrical</option>
            <option>Plumbing</option>
            <option>Carpentry</option>
            <option>Internet</option>
            <option>Cleaning</option>
            <option>Other</option>
          </select>

          {/* Priority */}
          <select
            name="priority"
            value={formDataState.priority}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", marginBottom: "20px" }}
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          {/* Image */}
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            style={{ marginBottom: "25px" }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "14px",
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}