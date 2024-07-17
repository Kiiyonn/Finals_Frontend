import React from "react";

// Component for displaying a list of expenses
const ExpenseList = ({
  expenses, // Array of expense objects
  handleDeleteExpense, // Function to handle deleting an expense
  handleEditExpense, // Function to handle editing an expense
}) => {
  return (
    <section className="expense-list">
      <h2>Expenses</h2>
      {expenses.map(
        (
          expense // Maps over the expenses array to create a list
        ) => (
          <div className="expense-item" key={expense.id}>
            <span>
              {expense.description}: ${expense.amount} -{" "}
              {new Date(expense.date).toLocaleDateString()}
            </span>
            <button
              className="remove-btn"
              onClick={() => handleDeleteExpense(expense.id)} // Button to delete the expense, calls handleDeleteExpense
            >
              -
            </button>
            <button
              className="edit-btn"
              onClick={() => handleEditExpense(expense)} // Button to edit the expense, calls handleEditExpense
            >
              Edit
            </button>
          </div>
        )
      )}
    </section>
  );
};

export default ExpenseList; // Exports the ExpenseList component for use in other parts of the application
