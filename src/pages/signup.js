// src/pages/signup.js

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
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        alert("Error signing up");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Error signing up");
    }
  };

  return (
    <div className="signup-page">
      <div className="background">
        <img src={bg} alt="background" />
      </div>
      <div className="form-container">
        <div className="signup-form">
          <a href="/login" className="login-link">
            Back to Login
          </a>
          <h2>Sign Up</h2>
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
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
