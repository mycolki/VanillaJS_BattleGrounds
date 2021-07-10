import React from "react";
import "./styles.css";

export default function Player({ updateInputValue, playerOrder, submitData, readyToStart }) {
  function handleSubmit(ev) {
    ev.preventDefault();
    if (readyToStart) submitData();
  }

  return (
    <li className="user">
      <p className="title">{playerOrder}</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your Github ID"
          onChange={ev => updateInputValue(ev.target.value, playerOrder)}
        />
      </form>
    </li>
  );
}
