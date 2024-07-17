import React from "react";
import edit from "../img/edit.svg";
import "../styles/BudgetSummary.css";

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
        {isEditingBudget ? (
          <>
            <input
              type="number"
              className="budget-input"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <button onClick={handleEditBudget}>Save</button>
          </>
        ) : (
          <>
            <span>${budget}</span>
            <img
              src={edit}
              alt="edit budget"
              onClick={() => setIsEditingBudget(true)}
            />
          </>
        )}
      </div>
      <div className="summary-item remaining">
        <h2>Remaining</h2>
        <span>${remaining}</span>
      </div>
      <div className="summary-item total-spent">
        <h2>Total Spent</h2>
        <span>${totalSpent}</span>
      </div>
    </div>
  );
};

export default BudgetSummary;
