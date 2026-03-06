import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function UserDashboard() {
  const [services, setServices] = useState([]);
  const [user, setUser] = useState(null);

  const [userType, setUserType] = useState("");
  const [department, setDepartment] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const userRes = await api.get("/auth/me");
    setUser(userRes.data);

    const serviceRes = await api.get("/services/my");
    setServices(serviceRes.data);
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    if (!profilePhoto) {
      alert("Profile photo is required");
      return;
    }

    const formData = new FormData();
    formData.append("userType", userType);
    formData.append("department", department);
    formData.append("roomNumber", roomNumber);
    formData.append("profilePhoto", profilePhoto);

    await api.put("/users/profile", formData);
    fetchData();
  };

  const totalRaised = services.length;
  const inProgress = services.filter(
    (s) => s.status === "ASSIGNED" || s.status === "IN_PROGRESS"
  ).length;
  const completed = services.filter(
    (s) => s.status === "COMPLETED"
  ).length;

  return (
    <div style={{ display: "flex" }}>
      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "220px",
          width: "100%",
          background: "#e6f0ff",
          minHeight: "100vh",
          padding: "40px 60px",
        }}
      >
        <h1 style={{ marginBottom: "30px" }}>
          Welcome, {user?.name}
        </h1>

        {!user?.userType ? (
          <form
            onSubmit={updateProfile}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "40px",
            }}
          >
            <h3 style={{ marginBottom: "20px" }}>
              Complete Your Profile
            </h3>

            <select
              required
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            >
              <option value="">Select Type</option>
              <option value="HOSTELLER">Hosteller</option>
              <option value="DAY_SCHOLAR">Day Scholar</option>
            </select>

            <input
              type="text"
              placeholder="Department"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
            />

            {userType === "HOSTELLER" && (
              <input
                type="text"
                placeholder="Room Number"
                required
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px" }}
              />
            )}

            <input
              type="file"
              required
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              style={{ marginBottom: "15px" }}
            />

            <button
              type="submit"
              style={{
                padding: "10px 25px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Save Profile
            </button>
          </form>
        ) : (
          <div
            style={{
              background: "#ffffff",
              padding: "40px",
              borderRadius: "18px",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* LEFT DETAILS */}
            <div>
              <h3 style={{ marginBottom: "20px" }}>
                Profile Details
              </h3>
              <p><strong>Type:</strong> {user.userType}</p>
              <p><strong>Department:</strong> {user.department}</p>
              {user.userType === "HOSTELLER" && (
                <p><strong>Room:</strong> {user.roomNumber}</p>
              )}
            </div>

            {/* SMALL ROUNDED PROFILE IMAGE (Like Screenshot) */}
            <div>
              <img
                src={`http://localhost:5000/uploads/${user.profilePhoto}`}
                alt="Profile"
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50px",
                  objectFit: "cover",
                  border: "6px solid #2563eb",
                  boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
                }}
              />
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "30px" }}>
          <StatusCard title="Total Raised" value={totalRaised} color="#1d4ed8" />
          <StatusCard title="In Progress" value={inProgress} color="#d97706" />
          <StatusCard title="Completed" value={completed} color="#16a34a" />
        </div>
      </div>
    </div>
  );
}

function StatusCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "18px",
        width: "48%",
        textAlign: "center",
        boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        borderTop: `5px solid ${color}`,
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 6px 18px rgba(0,0,0,0.08)";
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>
      <p style={{ fontSize: "22px", fontWeight: "bold", color }}>
        {value}
      </p>
    </div>
  );
}