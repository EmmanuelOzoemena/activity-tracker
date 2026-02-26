import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Registration from "./components/Registration/Registration";
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        {/* <Route path="/activities" element={<Activities />} /> */}
        {/* <Route path="/youths" element={<Youths />} /> */}
      </Routes>
  
    </>
  )
}

export default App
