import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "./UnderConstruction.css";

const UnderConstruction = ({ underConstruction, setUnderConstruction }) => {
  const navigate = useNavigate();

  const redirectToHomepage = () => {
    setUnderConstruction(false);
    navigate("/");
  };

  return (
    <Modal
      isOpen={underConstruction}
      onRequestClose={redirectToHomepage}
      className="underconstruction-component"
      overlayClassName="Overlay"
    >
      <div className="underconstruction-message-section">
        <h2 className="underconstruction-gradientText">Oops!</h2>
        <p className="underconstruction-message">
          This page is currently under construction.
        </p>
        <button
          className="underconstruction-homeButton"
          onClick={redirectToHomepage}
        >
          Return to Homepage
        </button>
      </div>
    </Modal>
  );
};

export default UnderConstruction;
