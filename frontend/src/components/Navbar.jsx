import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  
  const location = useLocation();

  if (location.pathname === "/") {
    return null; // hide navbar on login page
  }


  if (!token) return null;

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/create-service">Create Service</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}