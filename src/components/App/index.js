import React, { useEffect, useState } from "react";
import { battle } from "../../utils/api";
import NavButton from "../NavButton";
import Popular from "../Popular";
import Battle from "../Battle";
import "./styles.css";

export default function App() {
  const [showBattle, setShowBattle] = useState(false);
  const [playerData, setPlayerData] = useState([]);

  useEffect(() => {
    if (showBattle) {
      document.body.style.backgroundImage = "url(/image/battle.jpeg)";
      return;
    }

    document.body.style.backgroundImage = "";
  }, [showBattle]);

  async function setData(names) {
    const fetchedData = await battle(names);
    setPlayerData(fetchedData);
  }

  function toggleView(showBattle) {
    setShowBattle(showBattle);
  }

  function initializeData() {
    setPlayerData([]);
  }

  return (
    <div className={showBattle ? "container background" : "container"}>
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

      {showBattle && (
        <Battle
          setData={setData}
          initializeData={initializeData}
          data={playerData}
        />
      )}
    </div>
  );
}
