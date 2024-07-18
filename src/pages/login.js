import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import bg from "../img/bg.jpg";

const LoginForm = () => {
  // State hooks for managing form input and messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const navigate = useNavigate();

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents the default form submission behavior

    try {
      // Making a POST request to the authentication endpoint
      const response = await fetch("http://localhost:8080/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parsing the JSON response from the server

      // Handling non-OK responses by throwing an error
      if (!response.ok) {
        throw new Error(data.message || "Failed to login");
      }

      // Storing the JWT in local storage and updating the state
      localStorage.setItem("jwtToken", `Bearer ${data.jwt}`);
      setToken(data.jwt);
      console.log("Token stored:", data.jwt);

      navigate("/"); // Navigate to the home page on successful login
    } catch (error) {
      console.error("Error logging in:", error);
      setError(error.message || "An error occurred while logging in");
    }
  };

  return (
    <div className="login-page">
      <div className="background">
        <img src={bg} alt="background" /> { /* Background image for the login page  */ }
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
          {error && <p className="error-message">{error}</p>} { /* Displaying
          error messages  */ }
          {token && <p className="token-message">Token: {token}</p>} { /*
          Debugging: displaying the token  */ }
          <div className="signup-link">
            <span>Don't have an account?</span>
            <a href="/signup">Create an account</a> { /* Link to the signup page  */ }
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; // Exporting the LoginForm component
