import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    if (showBattle) {
      document.body.style.backgroundImage="url(/image/battle.jpeg)";
      return;
    }

    document.body.style.backgroundImage="";
  }, [showBattle]);

  return (
    <div
      className={showBattle
        ? "container background"
        : "container"}
    >
      <div className="grid space-between">
        <NavButton
          isActive={!showBattle}
          text="POPULAR STORAGE"
          onClick={() => toggleView(false)}
        />
        <NavButton
          isActive={showBattle}
          text="GITHUB BATTLE"
          onClick={() => toggleView(true)}
        />
      </div>
      {!showBattle && <Popular />}
      {showBattle && <Battle fetchData={fetchData} players={players} />}
    </div>
  );
}
