import React, { useState } from "react";
import Player from "../Player";
import "./styles.css";
import Profile from '../Profile';

export default function Battle({ fetchData, players }) {
  const [readyToBattle, setReadyToBattle] = useState(false);
  const [playerNames, setPlayerNames] = useState({ PLAYER1: null, PLAYER2: null });
  const PLAYERS = { NO1: "PLAYER1", NO2: "PLAYER2" };
  const centerText = players.length
    ? players[0].profile.name + " is Win!"
    : "BATTLE GROUND";

  function handleClick() {
    const names = Object.values(playerNames);
    fetchData(names);
    setReadyToBattle(false);
  }

  function updateNames(name, order) {
    setPlayerNames(names => {
      const updated = { ...names };
      updated[order] = name;
      return updated;
    });

    const isReady = Object.values(playerNames).every(name => name !== null);
    if (isReady) setReadyToBattle(true);
  }

  return (
    <>
      <h1 className="centerText">{centerText}</h1>
      <section>
        <ul className="players">
          {players.length
              ? players.map(player => <Profile key={player.profile.node_id} player={player} />)
              : Object.keys(PLAYERS).map(key => (
                  <Player
                    key={key}
                    playerNumber={PLAYERS[key]}
                    updateInputValue={updateNames}
                    submitData={handleClick}
                    readyToBattle={readyToBattle}
                  />
                ))
          }
        </ul>
        {readyToBattle && <button className="battleButton" onClick={handleClick}>BATTlE!</button>}
      </section>
      <footer>
      </footer>
    </>
  );
}
