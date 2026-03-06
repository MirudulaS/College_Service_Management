import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div
      style={{
        width: "280px",
        height: "100vh",
        background: "#1e293b",
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "50px 30px",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h2
        style={{
          marginBottom: "60px",
          fontSize: "34px",
          fontWeight: "700",
          letterSpacing: "0.5px"
        }}
      >
        Portal
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "40px"
        }}
      >
        <Link to="/user" style={linkStyle}>Dashboard</Link>

        <Link to="/raise-request" style={linkStyle}>
          Raise Request
        </Link>

        <Link to="/raised-requests" style={linkStyle}>
          Raised Requests
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  color: "#e2e8f0",
  textDecoration: "none",
  fontSize: "22px",
  fontWeight: "500",
  lineHeight: "1.6"
};