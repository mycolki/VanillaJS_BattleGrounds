import React from "react";
import "./styles.css";
import { BUTTONS } from "../../constants/battlegrounds";

export default function Button({ readyToStart, onClickStart, onClickRestart, data, error }) {
  return (
    <>
      {readyToStart && (
        <button
          className="startButton playButton"
          onClick={onClickStart}
        >
          {BUTTONS.START}
        </button>
      )}
      {(data || error) && (
        <button
          className="restartButton playButton"
          onClick={onClickRestart}
        >
          {BUTTONS.RESTART}
        </button>
      )}
    </>
  );
}
