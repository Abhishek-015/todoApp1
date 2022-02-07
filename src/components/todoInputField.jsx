import React from "react";

const Input = ({ value, handleChange }) => (
  <div className="col">
    <input
      type="text"
      className="form-control inputTitle inputBody"
      placeholder="Add Task..."
      value={value}
      onChange={handleChange}
      key="input"
      autoFocus
    />
  </div>
);

export default Input;
