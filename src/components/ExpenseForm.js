import React, { useState, useEffect } from "react";

// Component for submitting expense details
const ExpenseForm = ({
  onSubmit,
  initialDescription = "",
  initialAmount = "",
  buttonText,
}) => {
  const [description, setDescription] = useState(initialDescription); // State for the expense description
  const [amount, setAmount] = useState(initialAmount); // State for the expense amount

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submit action
    const currentDate = new Date().toISOString(); // Gets the current date in ISO string format
    onSubmit({ description, amount: parseFloat(amount), date: currentDate }); // Calls onSubmit prop with the expense data
    setDescription(""); // Resets the description state
    setAmount(""); // Resets the amount state
  };

  // Effect to reset form fields when initial values change
  useEffect(() => {
    setDescription(initialDescription); // Sets description state to initialDescription
    setAmount(initialAmount); // Sets amount state to initialAmount
  }, [initialDescription, initialAmount]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Updates state on input change
        required // Makes the field required for submission
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)} // Updates state on input change
        required // Makes the field required for submission
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ExpenseForm; // Exports the ExpenseForm component for use in other parts of the application
