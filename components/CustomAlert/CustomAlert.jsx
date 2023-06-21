import React from "react";
import { Alert } from "react-bootstrap";

const CustomAlert = ({ message, backgroundColor }) => {
  return (
    <Alert variant="danger" style={{ backgroundColor: backgroundColor }}>
      {message}
    </Alert>
  );
};

export default CustomAlert;
