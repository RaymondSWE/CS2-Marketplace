import React from "react";
import "./Toaster.css";

const Toaster = ({ message, isOpen, onClose }) => {
  console.log("Toaster isOpen:", isOpen);
  return (
    <div className={`toaster ${isOpen ? "open" : ""}`}>
      <button className="close-button" onClick={onClose}>
        ×
      </button>
      <p>{message}</p>
    </div>
  );
};

export default Toaster;
