import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Contact from "../pages/Contact";
import Loginpage from "../Shared/Loginpage";
import Admin from "../pages/Admin";


export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Contact></Contact>} />
        <Route path="/login" element={<Loginpage></Loginpage>} />
        <Route path="/admin" element={<Admin></Admin>} />
      </Routes>
    </Router>
  );
}
