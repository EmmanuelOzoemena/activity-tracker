// import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App"; 
import AdminDashboard from "./pages/AdminDashboard"; 

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />

      {/* Admin Dashboard Table View */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/registrations" element={<AdminDashboard />} />
    </Routes>
  );
}
