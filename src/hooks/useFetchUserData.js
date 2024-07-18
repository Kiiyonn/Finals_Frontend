import { useState, useEffect, useMemo } from "react";
import { fetchWithToken } from "../pages/api.js"; // Import fetchWithToken from api.js
import apiUrl from "../pages/api.js"; // Import apiUrl from api.js

// Custom React hook for fetching and managing user data and expenses
const useFetchUserData = () => {
  // State hooks for user budget, remaining balance, total spent, expenses list, and username
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState("");

  // Retrieve the JWT token from localStorage to authenticate API requests
  const token = localStorage.getItem("jwtToken");

  // Memoize headers to prevent unnecessary re-creation on each render
  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: token,
    }),
    [token]
  );

  useEffect(() => {
    // Redirect to login page if no token is available
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // Fetch user data from the API
    fetch(`${apiUrl}/users/me`, { headers })
      .then((response) => {
        // Handle unauthorized access by redirecting to login
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response.json();
      })
      .then((data) => {
        // Update budget, username, and remaining balance
        setBudget(data.budget);
        setUsername(data.username);
        setRemaining(data.budget - totalSpent);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    // Fetch expenses data from the API
    fetch(`${apiUrl}/expenses`, { headers })
      .then((response) => {
        // Handle unauthorized access by redirecting to login
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response.json();
      })
      .then((data) => {
        // Update expenses and calculate total spent
        setExpenses(data);
        const total = data.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalSpent(total);
        setRemaining(budget - total);
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, [budget, totalSpent, headers, token]); // Dependencies for useEffect to control re-rendering

  // Return state and setters for use in components
  return {
    budget,
    remaining,
    totalSpent,
    expenses,
    username,
    headers,
    setBudget,
    setExpenses,
    setRemaining,
    setTotalSpent,
  };
};

export default useFetchUserData; // Export the custom hook for external use
