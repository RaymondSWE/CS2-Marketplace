import React from "react";
import { FaAccusoft } from "react-icons/fa";
import "./GradientButtonWithIcon.css";

const GradientButtonWithIcon = (props) => {
  return (
    <>
      <button className="btn GradientBtn my-2 mr-2 my-sm-0 text-white">
        <span>{props.icon}</span>
        <span className="text-white GradientBtnWhite">{props.text}</span>
      </button>
    </>
  );
};

export default GradientButtonWithIcon;
