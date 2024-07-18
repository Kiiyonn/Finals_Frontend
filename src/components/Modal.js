import React from "react";
import "../styles/Modal.css";

// Modal component for displaying content in a modal dialog for updating expenses
const Modal = ({
  show, // Boolean that controls if the modal is shown
  onClose, // Function to call when closing the modal
  children, // Content to display inside the modal
}) => {
  if (!show) return null; // If 'show' is false, do not render the modal

  return (
    <div className="modal-overlay">
      {" "}
      { /* Overlay that covers the viewport */ }
      <div className="modal-content">
        {" "}
        { /* Container for the modal content */ }
        <button className="close-button" onClick={onClose}>
          X { /* Button to close the modal */ }
        </button>
        {children} { /* Displays the content passed as children */ }
      </div>
    </div>
  );
};

export default Modal; // Exports the Modal component for use in other parts of the application
