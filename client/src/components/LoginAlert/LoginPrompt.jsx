import React from "react";

const LoginPrompt = ({ title, description, onLoginClick }) => {
  return (
    <div className="parent-container">
      <div className="login-section">
        <h2 className="gradientText">{title}</h2>
        <p>{description}</p>
        <button
          className="btn GradientBtn my-2 px-4 mr-2 my-sm-0 text-white"
          onClick={onLoginClick}
        >
          Log In with Steam
        </button>
      </div>
    </div>
  );
};

export default LoginPrompt;
