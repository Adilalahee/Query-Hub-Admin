import Signup from "./Shared/Signup";
import Loginpage from "./Shared/Loginpage";
import Contact from "./pages/Contact";
import PrivateRoute from "./Route/Privateroute";
import Admin from "./pages/Admin";
import { AuthProvider } from "./Authentication/AuthContext";
import { Route, Router, Routes } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
        <Routes>
          <Route path="/" element={<Contact></Contact>} />
          <Route path="/signup" element={<Signup></Signup>} />
          <Route path="/login" element={<Loginpage></Loginpage>} />
          <Route path="/admin" element={<PrivateRoute><Admin></Admin></PrivateRoute>} />
        </Routes>
    </AuthProvider>
  );
}

export default App;
