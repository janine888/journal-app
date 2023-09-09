import React from "react";

function ErrorMessage() {
  return (
    <div className="ErrorMessage">
      <h1>Error</h1>
      <p>You've already submitted today's journal entry. Please return tomorrow and keep it up!</p>
    </div>
  );
};

export default ErrorMessage;