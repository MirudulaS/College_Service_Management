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
    <div style={{ display: "flex", fontFamily: "Inter, sans-serif" }}>

      <Sidebar role="USER" />

      <div
        style={{
          marginLeft: "280px",
          width: "calc(100% - 280px)",
          background: "linear-gradient(135deg,#eef2ff,#f8fafc)",
          minHeight: "100vh",
          padding: "40px 60px",
          boxSizing: "border-box"
        }}
      >
        <h1
          style={{
            marginBottom: "35px",
            fontSize: "34px",
            fontWeight: "700",
            color: "#1e293b",
          }}
        >
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
            <h3 style={{ marginBottom: "20px" }}>Complete Your Profile</h3>

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
              background: "white",
              padding: "40px",
              borderRadius: "20px",
              marginBottom: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
              border: "1px solid #e2e8f0",
            }}
          >

            <div style={{ flex: 1 }}>
              <h3
                style={{
                  marginBottom: "28px",
                  fontSize: "30px",
                  fontWeight: "700",
                  color: "#1e293b",
                }}
              >
                Profile Details
              </h3>

              <ProfileRow label="Type" value={user.userType} />
              <ProfileRow label="Department" value={user.department} />

              {user.userType === "HOSTELLER" && (
                <ProfileRow label="Room" value={user.roomNumber} />
              )}
            </div>

            <div
              style={{
                width: "180px",
                height: "180px",
                overflow: "hidden",
                borderRadius: "50%",
                boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                border: "6px solid #eef2ff",
              }}
            >
              <img
                src={
                  user?.profilePhoto
                    ? `http://localhost:5000/uploads/${user.profilePhoto}`
                    : ""
                }
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: "30px" }}>
          <StatusCard title="Total Raised" value={totalRaised} color="#2563eb" />
          <StatusCard title="In Progress" value={inProgress} color="#d97706" />
          <StatusCard title="Completed" value={completed} color="#16a34a" />
        </div>

      </div>
    </div>
  );
}

function ProfileRow({ label, value }) {
  return (
    <div
      style={{
        display: "flex",
        marginBottom: "18px",
        fontSize: "22px",
        alignItems: "center",
        color: "#334155",
      }}
    >
      <span style={{ width: "180px", fontWeight: "600" }}>{label}</span>
      <span style={{ width: "25px" }}>:</span>
      <span style={{ marginLeft: "20px" }}>{value}</span>
    </div>
  );
}

function StatusCard({ title, value, color }) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "45px",
        borderRadius: "20px",
        width: "48%",
        textAlign: "center",

        /* Strong visible card shadow */
        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",

        border: "1px solid #e2e8f0",
        transition: "all 0.25s ease",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-8px)";
        e.currentTarget.style.boxShadow =
          "0 20px 45px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow =
          "0 12px 30px rgba(0,0,0,0.12)";
      }}
    >
      <h3
        style={{
          marginBottom: "18px",
          fontSize: "24px",
          color: "#334155",
          fontWeight: "600"
        }}
      >
        {title}
      </h3>

      <p
        style={{
          fontSize: "42px",
          fontWeight: "700",
          color
        }}
      >
        {value}
      </p>
    </div>
  );
} 