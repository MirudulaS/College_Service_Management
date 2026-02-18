import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateService from "./pages/CreateService";
import Navbar from "./components/Navbar";

//test@gmail.com --> 123

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-service" element={<CreateService />} />
      </Routes>
    </BrowserRouter>
  );
}