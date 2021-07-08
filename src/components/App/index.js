import React, { useState } from "react";
import Popular from "../Popular";
import Battle from "../Battle";
import NavButton from "../NavButton";
import { battle } from "../../utils/api";
import "./styles.css";

export default function App() {
  const [showBattle, setShowBattle] = useState(false);
  const [players, setPlayers] = useState([]);

  function toggleView(showBattle) {
    setShowBattle(showBattle);
  }

  async function fetchData(names) {
    const playerData = await battle(names);
    setPlayers(playerData);
  }

  return (
    <div className="container">
      <div className="grid space-between">
        <NavButton
          isActive={!showBattle}
          text="인기 저장소"
          onClick={() => toggleView(false)}
        />
        <NavButton
          isActive={showBattle}
          text="Github 대결"
          onClick={() => toggleView(true)}
        />
      </div>
      {!showBattle && <Popular />}
      {showBattle && <Battle fetchData={fetchData} players={players} />}
    </div>
  );
}
