import { Link } from "react-router-dom";

export default function Sidebar({ role }) {

  const sidebarStyle = {
    width: "280px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    position: "fixed",
    left: 0,
    top: 0,
    padding: "30px 20px",
    boxSizing: "border-box"
  };

  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    marginBottom: "20px",
    fontSize: "18px"
  };

  return (
    <div style={sidebarStyle}>

      <h2 style={{ marginBottom: "40px" }}>
        Portal
      </h2>

      {/* USER SIDEBAR */}
      {role === "USER" && (
        <>
          <Link to="/user" style={linkStyle}>Dashboard</Link>
          <Link to="/raise-request" style={linkStyle}>Raise Request</Link>
          <Link to="/raised-requests" style={linkStyle}>Raised Requests</Link>
        </>
      )}

      {/* ADMIN SIDEBAR */}
      {role === "ADMIN" && (
        <>
          <Link to="/admin" style={linkStyle}>Dashboard</Link>
          <Link to="/admin/requests" style={linkStyle}>Past Requests</Link>
          <Link to="/admin/providers" style={linkStyle}>Service Providers</Link>
        </>
      )}

      {/* SERVICE PROVIDER SIDEBAR */}
      {role === "SERVICE_PROVIDER" && (
        <>
          <Link to="/provider" style={linkStyle}>Scheduled Work</Link>
          <Link to="/provider/work" style={linkStyle}>Work In Progress</Link>
          <Link to="/provider/history" style={linkStyle}>Past Work / Completed Work</Link>
        </>
      )}

    </div>
  );
}