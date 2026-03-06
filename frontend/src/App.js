import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import RaiseRequest from "./pages/RaiseRequest";
import RaisedRequests from "./pages/RaisedRequests";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/provider" element={<ProviderDashboard />} />

        {/* Raise Form Page */}
        <Route path="/raise-request" element={<RaiseRequest />} />

        {/* Raised Requests List */}
        <Route path="/raised-requests" element={<RaisedRequests />} />
      </Routes>
    </BrowserRouter>
  );
}