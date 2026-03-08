import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
// import ProviderDashboard from "./pages/ProviderDashboard";
import RaiseRequest from "./pages/RaiseRequest";
import RaisedRequests from "./pages/RaisedRequests";
import RequestPhoto from "./pages/RequestPhoto";
//Admin
import AdminDashboard from "./pages/AdminDashboard";
import AdminRequests from "./pages/AdminRequests";
import AdminProviders from "./pages/AdminProviders";
//Service Provider
import ProviderDashboard from "./pages/ProviderDashboard";
import ProviderWork from "./pages/ProviderWork";
import ProviderHistory from "./pages/ProviderHistory";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* USER */}
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/raise-request" element={<RaiseRequest />} />
        <Route path="/raised-requests" element={<RaisedRequests />} />
        <Route path="/request-photo/:filename" element={<RequestPhoto />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/requests" element={<AdminRequests />} />
        <Route path="/admin/providers" element={<AdminProviders />} />

        {/* PROVIDER */}
        <Route path="/provider" element={<ProviderDashboard />} />
        <Route path="/provider/work" element={<ProviderWork />} />
        <Route path="/provider/history" element={<ProviderHistory />} />
        
      </Routes>
    </BrowserRouter>
  );
}