import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/signup.css";
import bg from "../img/bg.jpg";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempting to send a POST request to the registration endpoint
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Setting content type as JSON
        },
        body: JSON.stringify({ username, password }), // Sending username and password in the request body
      });

      if (response.ok) {
        // If the response status is successful
        alert("Registration successful! You can now log in."); // Alert the user to successful registration
        navigate("/login"); // Redirect user to the login page
      } else {
        alert("Error signing up"); // Alert the user to an error during signup
      }
    } catch (error) {
      alert("Error signing up"); // Alert the user to an error
    }
  };

  return (
    <div className="signup-page">
      <div className="background">
        <img src={bg} alt="background" /> // Display the background image
      </div>
      <div className="form-container">
        <div className="signup-form">
          <a href="/login" className="login-link">
            {" "}
            // Link to navigate back to the login page Back to Login
          </a>
          <h2>Sign Up</h2> // Form header
          <form onSubmit={handleSubmit}>
            {" "}
            // Form element with an onSubmit event handler
            <div className="form-group">
              <label htmlFor="username">Username:</label> // Username input
              field
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} // Update state on input change
                required // Field is required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label> // Password input
              field
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update state on input change
                required // Field is required
              />
            </div>
            <button type="submit">Sign Up</button> // Submit button for the form
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm; // Exporting the SignupForm component
