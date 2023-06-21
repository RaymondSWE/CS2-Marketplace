import React from "react";

const DarkButtonIcon = (props) => {
  return (
    <>
      <button className="btn navbarBtn my-2 mr-2 my-sm-0">
        <span className="darkModeBtn">
          <img src={props.icon} className="darkModeBtnIcon" alt="" />
        </span>
      </button>
    </>
  );
};

export default DarkButtonIcon;
