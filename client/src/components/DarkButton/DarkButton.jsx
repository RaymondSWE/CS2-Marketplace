import React from "react";

const DarkButton = (props) => {
  return (
    <>
      <button className="btn Darkbtn my-2 mr-2 my-sm-0">
        <span className="darkModeBtn">{props.text}</span>
      </button>
    </>
  );
};

export default DarkButton;
