import { useState, useEffect, useMemo } from "react";

const useFetchUserData = () => {
  const [budget, setBudget] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [username, setUsername] = useState("");
  const token = localStorage.getItem("jwtToken");

  const headers = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: token,
    }),
    [token]
  );

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    fetch("http://localhost:8080/api/users/me", { headers })
      .then((response) => {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response.json();
      })
      .then((data) => {
        setBudget(data.budget);
        setUsername(data.username);
        setRemaining(data.budget - totalSpent);
      })
      .catch((error) => console.error("Error fetching user data:", error));

    fetch("http://localhost:8080/api/expenses", { headers })
      .then((response) => {
        if (response.status === 401) {
          window.location.href = "/login";
        }
        return response.json();
      })
      .then((data) => {
        setExpenses(data);
        const total = data.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalSpent(total);
        setRemaining(budget - total);
      })
      .catch((error) => console.error("Error fetching expenses:", error));
  }, [budget, totalSpent, headers, token]);

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

export default useFetchUserData;
