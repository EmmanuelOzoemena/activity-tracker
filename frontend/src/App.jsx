import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Registration from "./components/Registration/Registration";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./pages/Admin/AdminPanel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />

        <Route path="/admin" element={<AdminPanel />} />

        {/* <Route path="/activities" element={<Activities />} /> */}
        {/* <Route path="/youths" element={<Youths />} /> */}
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
