import React from "react";
import "./DarkButtonWithIcon.css";

const DarkButtonWithIcon = (props) => {
  return (
    <>
      <button
        className="btn Darkbtn my-2 mr-2 my-sm-0"
        disabled={props.disabled}
      >
        <span>{props.icon}</span>
        <span className="darkModeBtn">{props.text}</span>
      </button>
    </>
  );
};

export default DarkButtonWithIcon;
