import React, { useState } from "react";
import Player from "../Player";
import "./styles.css";
import Profile from '../Profile';
import Button from '../Button';
import Loading from '../Loading';
import { WINNER_COMMENT } from "../../constants/battlegrounds";


export default function Battle({ setData, data, initializeData }) {
  const [readyToBattle, setReadyToBattle] = useState(false);
  const [names, setNames] = useState({ PLAYER1: null, PLAYER2: null });
  const PLAYERS = { NO1: "PLAYER1", NO2: "PLAYER2" };

  function updateNames(name, order) {
    setNames(prevNames => {
      const updated = { ...prevNames };
      updated[order] = name;
      return updated;
    });

    const isReady = Object.values(names).every(name => name !== null);
    if (isReady) setReadyToBattle(true);
  }

  function startToSetData() {
    const values = Object.values(names);
    setData(values);
    setReadyToBattle(false);
  }

  return (
    <>
      <header className="header">
        <h1 className="centerText">
          {!!data.length ? WINNER_COMMENT : " "}
        </h1>
        <Button
          readyToStart={readyToBattle}
          onClickStart={startToSetData}
          onClickRestart={() => initializeData()}
          data={data}
        />
      </header>
      <section className="playersContainer">
        <ul className="players">
          {!!data.length
            ? data.map((item, index) => (
              <Profile
                // key={player.profile.node_id} //**api하면 되돌리기!**/
                key={index}
                index={index}
                user={item}
              />))
            : Object.keys(PLAYERS).map(key => (
              <Player
                key={key}
                playerOrder={PLAYERS[key]}
                updateInputValue={updateNames}
                submitData={startToSetData}
                readyToStart={readyToBattle}
              />
            ))
          }
        </ul>
      </section>
    </>
  );
}
