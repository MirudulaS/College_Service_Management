import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ role }) {
  return (
    <div className="sidebar">
      <h2 className="logo">Portal</h2>

      {role === "USER" && (
        <>
          <Link to="/user" className="sidebar-link">
            Dashboard
          </Link>

          <Link to="/raise-request" className="sidebar-link">
            Raise Request
          </Link>

          <Link to="/raised-requests" className="sidebar-link">
            Raised Requests
          </Link>
        </>
      )}

      {role === "ADMIN" && (
        <Link to="/admin" className="sidebar-link">
          Dashboard
        </Link>
      )}

      {role === "SERVICE_PROVIDER" && (
        <Link to="/provider" className="sidebar-link">
          Dashboard
        </Link>
      )}
    </div>
  );
}