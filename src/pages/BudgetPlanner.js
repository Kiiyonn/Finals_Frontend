// src/pages/BudgetPlanner.js

import React, { useState } from "react";
import "../styles/BudgetPlanner.css";
import logo from "../img/logo.png";
import logout from "../img/logout.png";
import ExpenseForm from "../components/ExpenseForm";
import Modal from "../components/Modal.js";
import BudgetSummary from "../components/BudgetSummary.js";
import ExpenseList from "../components/ExpenseList.js";
import useFetchUserData from "../hooks/useFetchUserData";

const BudgetPlanner = () => {
  const {
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
  } = useFetchUserData();

  const [expenseDescription, setExpenseDescription] = useState("");
  const [expenseCost, setExpenseCost] = useState("");
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [newBudget, setNewBudget] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const handleAddExpense = (expense) => {
    fetch("http://localhost:8080/api/expenses", {
      method: "POST",
      headers,
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((data) => {
        setExpenses([...expenses, data]);
        setTotalSpent(totalSpent + data.amount);
        setRemaining(budget - (totalSpent + data.amount));
      })
      .catch((error) => console.error("Error adding expense:", error));
  };

  const handleDeleteExpense = (id) => {
    fetch(`http://localhost:8080/api/expenses/${id}`, {
      method: "DELETE",
      headers,
    })
      .then(() => {
        const updatedExpenses = expenses.filter((expense) => expense.id !== id);
        const expenseToDelete = expenses.find((expense) => expense.id === id);
        setExpenses(updatedExpenses);
        setTotalSpent(totalSpent - expenseToDelete.amount);
        setRemaining(budget - (totalSpent - expenseToDelete.amount));
      })
      .catch((error) => console.error("Error deleting expense:", error));
  };

  const handleEditBudget = () => {
    fetch(`http://localhost:8080/api/users/me/budget`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ budget: parseFloat(newBudget) }),
    })
      .then((response) => response.json())
      .then((data) => {
        setBudget(data.budget);
        setRemaining(data.budget - totalSpent);
        setIsEditingBudget(false);
      })
      .catch((error) => console.error("Error updating budget:", error));
  };

  const handleUpdateExpense = (expense) => {
    fetch(`http://localhost:8080/api/expenses/${editingExpenseId}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(expense),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedExpenses = expenses.map((exp) =>
          exp.id === editingExpenseId ? data : exp
        );
        setExpenses(updatedExpenses);
        setTotalSpent(
          updatedExpenses.reduce((acc, exp) => acc + exp.amount, 0)
        );
        setRemaining(budget - totalSpent);
        setShowModal(false);
      })
      .catch((error) => console.error("Error updating expense:", error));
  };

  const handleEditExpense = (expense) => {
    setExpenseDescription(expense.description);
    setExpenseCost(expense.amount);
    setEditingExpenseId(expense.id);
    setShowModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  };

  return (
    <div className="budget-planner">
      <div className="sidebar">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Log out <img src={logout} alt="Logout icon" />
        </button>
      </div>
      <main className="main-content">
        <header className="header">
          <h1>Budget Planner</h1>
          <div className="user-info">
            <span>Welcome, {username}</span>
          </div>
          <div className="search-container">
            <svg
              className="search-icon"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
            <input
              type="text"
              className="search-bar"
              placeholder="Type to search for expenses"
            />
          </div>
        </header>
        <BudgetSummary
          budget={budget}
          remaining={remaining}
          totalSpent={totalSpent}
          isEditingBudget={isEditingBudget}
          setIsEditingBudget={setIsEditingBudget}
          newBudget={newBudget}
          setNewBudget={setNewBudget}
          handleEditBudget={handleEditBudget}
        />
        <section className="add-expense">
          <h2>Add Expense</h2>
          <ExpenseForm onSubmit={handleAddExpense} buttonText="ADD" />
        </section>
        <ExpenseList
          expenses={expenses}
          handleDeleteExpense={handleDeleteExpense}
          handleEditExpense={handleEditExpense}
        />
      </main>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <h2>Edit Expense</h2>
        <ExpenseForm
          onSubmit={handleUpdateExpense}
          initialDescription={expenseDescription}
          initialAmount={expenseCost}
          buttonText="Update"
        />
      </Modal>
    </div>
  );
};

export default BudgetPlanner;
