import { Link } from "react-router-dom";

export default function AdminSidebar() {

  const sidebarStyle = {
    position: "fixed",
    left: 0,
    top: 0,
    width: "280px",
    height: "100vh",
    background: "#1e293b",
    color: "white",
    padding: "40px 25px",
    boxSizing: "border-box"
  };

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "700",
    marginBottom: "50px"
  };

  const linkStyle = {
    display: "block",
    color: "white",
    textDecoration: "none",
    marginBottom: "25px",
    fontSize: "18px"
  };

  return (
    <div style={sidebarStyle}>

      <div style={titleStyle}>Portal</div>

      <Link to="/admin" style={linkStyle}>
        Dashboard
      </Link>

      <Link to="/admin/requests" style={linkStyle}>
        Past Requests
      </Link>

      <Link to="/admin/providers" style={linkStyle}>
        Service Providers
      </Link>

    </div>
  );
}