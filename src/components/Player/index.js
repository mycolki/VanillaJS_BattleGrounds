import React from "react";
import "./styles.css";

export default function Player({ updateInputValue, playerNumber, submitData, readyToBattle }) {
  function handleKeyPress(ev) {
    if (ev.key === 'Enter' && readyToBattle) submitData();
  }

  return (
    <li className="player">
      <p className="title">{playerNumber}</p>
      <input
        type="text"
        placeholder="Enter your Github ID"
        onChange={ev => updateInputValue(ev.target.value, playerNumber)}
        onKeyPress={handleKeyPress}
      />
    </li>
  );
}
