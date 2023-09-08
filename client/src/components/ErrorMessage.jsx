import React from "react";

function ErrorMessage() {
  return (
    <div className="ErrorMessage">
      <h1>Error</h1>
      <p>You already submitted today's journal entry. Come back tomorrow and keep it up!</p>
    </div>
  );
};

export default ErrorMessage;