import React from "react";
import "./styles.css";

export default function Input({ updateInputValue, playerOrder, submitData, readyToStart, names }) {
  function handleSubmit(ev) {
    ev.preventDefault();
    if (readyToStart) submitData();
  }

  function handleChange(ev) {
    updateInputValue(ev.target.value, playerOrder);
  }

  return (
    <li className="user">
      <p className="title">{playerOrder}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={names[playerOrder]}
          placeholder="Enter your Github ID"
          onChange={handleChange}
        />
      </form>
    </li>
  );
}
