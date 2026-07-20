import { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Registration from "./components/Registration/Registration";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminPanel from "./pages/Admin/AdminPanel";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SkillRegistration from "./components/SkillRegistration/SkillRegistration";
import RegDetails from "./components/RegDetails/RegDetails";


function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const standalonePages = ["/login", "/register", "/skill-registration"];
  const isStandalone = standalonePages.includes(location.pathname);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  if (isStandalone) {
    return (
      <>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/skill-registration" element={<SkillRegistration />} />
        </Routes>
        {/* ToastContainer here so alerts work on login/register too */}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }

  return (
    <div className="app-wrapper">
  <Header toggleSidebar={toggleSidebar} />

      <div className="main-layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/skill-registration" element={<SkillRegistration />} /> */}

            {/* <Route path="/admin" element={<AdminPanel />} /> */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["admin"]}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/registrations"
              element={
                <ProtectedRoute role="admin">
                  <RegDetails />
                </ProtectedRoute>
              }
            />
          </Routes>

          <ToastContainer position="top-right" autoClose={3000} />
        </main>
      </div>
    </div>
  );
}

export default App;
