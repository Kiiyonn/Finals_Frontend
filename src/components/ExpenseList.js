import React from "react";
import "../styles/ExpenseList.css";
import remove from "../img/delete.svg";

const ExpenseList = ({ expenses, handleDeleteExpense, handleEditExpense }) => {
  return (
    <section className="expense-list">
      <h2>Expenses</h2>
      {expenses.map((expense) => (
        <div className="expense-item" key={expense.id}>
          <span>
            {expense.description}: ${expense.amount} -{" "}
            {new Date(expense.date).toLocaleDateString()}
          </span>
          <div className="button-container">
          <button
            className="remove-btn"
            onClick={() => handleDeleteExpense(expense.id)}
          >
          <img src={remove} alt="Delete" className="icon" />
          </button>
          <button
            className="edit-btn"
            onClick={() => handleEditExpense(expense)}
          >
            Edit
          </button>
        </div>
        </div>
      ))}
    </section>
  );
};

export default ExpenseList;
