import React from "react";
import { Modal, Button } from "react-bootstrap";

const LoginAlert = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>Login Required</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column align-items-center">
          <p>Please log in to access this page.</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          className="Darkbtn shadow px-4 my-2 mr-2 my-sm-0"
          variant="secondary"
          onClick={handleClose}
        >
          Close
        </Button>
        <a
          href={`${process.env.REACT_APP_API_URL}/api/auth/steam`}
          className="GradientBtn  px-4 mr-2 my-sm-0 text-white"
        >
          Log In
        </a>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginAlert;
