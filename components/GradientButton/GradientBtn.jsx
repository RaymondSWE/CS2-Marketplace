import React from "react";
import "./GradientBtn.css";

const GradientBtn = (props) => {
  return (
    <>
      <button className="btn navbarBtn my-2 mr-2 my-sm-0">
        <span className="navbarBtnGradientText">{props.text}</span>
      </button>
    </>
  );
};

export default GradientBtn;
