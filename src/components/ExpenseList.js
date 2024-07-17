import React from "react";

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
          <button
            className="remove-btn"
            onClick={() => handleDeleteExpense(expense.id)}
          >
            -
          </button>
          <button
            className="edit-btn"
            onClick={() => handleEditExpense(expense)}
          >
            Edit
          </button>
        </div>
      ))}
    </section>
  );
};

export default ExpenseList;
