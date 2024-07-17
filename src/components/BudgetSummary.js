import React from "react";
import edit from "../img/edit.svg";
import "../styles/BudgetSummary.css";

// Component for displaying the budget summary
const BudgetSummary = ({
  budget,
  remaining,
  totalSpent,
  isEditingBudget,
  newBudget,
  setNewBudget,
  setIsEditingBudget,
  handleEditBudget,
}) => {
  return (
    <div className="summary">
      <div className="summary-item budget">
        <h2>Budget</h2>
        {isEditingBudget ? ( // Checks if the budget is being edited
          <>
            <input
              type="number" // Input field for new budget
              value={newBudget} // Displays the current value of newBudget
              onChange={(e) => setNewBudget(e.target.value)} // Updates newBudget on change
              type="number"
              className="budget-input"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <button onClick={handleEditBudget}>Save</button> // Button to save
            the new budget
          </>
        ) : (
          <>
            <span>${budget}</span> // Displays the current budget
            <img
              src={edit} // Display edit icon
              alt="edit budget"
              onClick={() => setIsEditingBudget(true)} // Sets isEditingBudget to true to enable edit mode
            />
          </>
        )}
      </div>
      <div className="summary-item remaining">
        <h2>Remaining</h2>
        <span>${remaining}</span> // Displays the remaining budget
      </div>
      <div className="summary-item total-spent">
        <h2>Total Spent</h2>
        <span>${totalSpent}</span> // Displays the total amount spent
      </div>
    </div>
  );
};

export default BudgetSummary; // Exports the BudgetSummary component for use in other parts of the application
