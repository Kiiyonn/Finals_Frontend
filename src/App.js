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

// Function to handle user logout
const handleLogout = (navigate) => {
  localStorage.removeItem("jwtToken"); // Remove the JWT from local storage
  navigate("/login"); // Navigate to the login page
};

// Function to check the validity of the stored JWT
const checkTokenValidity = (navigate) => {
  const token = localStorage.getItem("jwtToken"); // Retrieve the JWT from local storage
  if (token) {
    try {
      const decodedToken = jwtDecode(token.split(" ")[1]); // Decode the JWT to get the payload
      const expiryTime = decodedToken.exp * 1000; // Convert the expiry time to milliseconds
      if (Date.now() >= expiryTime) {
        handleLogout(navigate); // If current time is past the expiry time, log out
      }
    } catch (e) {
      handleLogout(navigate); // If token is invalid, log out
    }
  }
};

// Main application component
const App = () => {
  const navigate = useNavigate(); // Hook to get navigation function

  useEffect(() => {
    checkTokenValidity(navigate); // Check token validity on component mount
  }, [navigate]);

  return (
    <div className="App">
      <Routes>
        {" "}
        { /* Define the application routes */}
        <Route path="/" element={<BudgetPlanner />} />  { /* Route for the main
        budget planner */}
        <Route path="/login" element={<LoginForm />} />  { /* Route for the login
        form */}
        <Route path="/signup" element={<SignupForm />} />  { /* Route for the
        signup form */}
      </Routes>
    </div>
  );
};

// Higher-order component wrapping the App in a Router
const WrappedApp = () => (
  <Router>
    {" "}
    <App />
  </Router>
);

export default WrappedApp; // Export the wrapped application component
