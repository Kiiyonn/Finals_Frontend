import React, { useState, useEffect } from "react";

const ExpenseForm = ({
  onSubmit,
  initialDescription = "",
  initialAmount = "",
  buttonText,
}) => {
  const [description, setDescription] = useState(initialDescription);
  const [amount, setAmount] = useState(initialAmount);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString(); // Get current date in ISO format
    onSubmit({ description, amount: parseFloat(amount), date: currentDate });
    setDescription("");
    setAmount("");
  };

  useEffect(() => {
    setDescription(initialDescription);
    setAmount(initialAmount);
  }, [initialDescription, initialAmount]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        required
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default ExpenseForm;
