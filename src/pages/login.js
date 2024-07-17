import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import bg from "../img/bg.jpg";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store error messages
  const [token, setToken] = useState(""); // State to store token for debugging

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Submitting:", { username, password }); // Debug: Log submitted credentials

    try {
      const response = await fetch("http://localhost:8080/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response Status:", response.status); // Debug: Log response status
      const data = await response.json(); // Parse JSON from response
      console.log("Response Data:", data); // Debug: Log response data

      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      localStorage.setItem("jwtToken", `Bearer ${data.jwt}`); // Storing the token correctly
      setToken(data.jwt); // Set token in state for debugging
      console.log("Token stored:", data.jwt); // Debug: Log token storage

      navigate("/"); // Navigate to the home page
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message || "An error occurred while logging in");
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <img src={bg} alt="background" />
      </div>
      <div className="form-container">
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
          {error && <p className="error-message">{error}</p>}
          {token && <p className="token-message">Token: {token}</p>}
          <div className="signup-link">
            <span>Don't have an account?</span>{" "}
            <a href="/signup">Create an account</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
