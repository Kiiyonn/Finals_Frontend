import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import BudgetPlanner from "./pages/BudgetPlanner";
import SignupForm from "./pages/signup";
import LoginForm from "./pages/login";
import { jwtDecode } from "jwt-decode";

const handleLogout = (navigate) => {
  localStorage.removeItem("jwtToken");
  navigate("/login");
};

const checkTokenValidity = (navigate) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    try {
      const decodedToken = jwtDecode(token.split(" ")[1]); // Split to get the actual token part
      const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
      if (Date.now() >= expiryTime) {
        handleLogout(navigate); // Token has expired, log out the user
      }
    } catch (e) {
      console.error("Invalid token:", e);
      handleLogout(navigate); // Invalid token, log out the user
    }
  }
};

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkTokenValidity(navigate);
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<BudgetPlanner />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
