import React, { useEffect, useState } from "react";
import { battle } from "../../utils/api";
import NavButton from "../NavButton";
import Popular from "../Popular";
import Battle from "../Battle";
import "./styles.css";

export default function App() {
  const [showBattlePage, setShowBattlePage] = useState(false);
  const [readyToBattle, setReadyToBattle] = useState(false);
  const [startBattle, setStartBattle] = useState(false);

  const [names, setNames] = useState({ PLAYER1: "", PLAYER2: "" });
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (showBattlePage) {
      document.body.style.backgroundImage = "url(/image/battle.jpeg)";
      return;
    }

    document.body.style.backgroundImage = "";
  }, [showBattlePage]);

  function toggleView(showBattle) {
    setShowBattlePage(showBattle);
  }

  function initializeData() {
    setNames({ PLAYER1: "", PLAYER2: "" });
    setData(null);
    setError(false);
  }

  useEffect(() => {
    (async function setFetchedData(names) {
      if (!startBattle) return;

      setError(false);
      setLoading(true);

      try {
        const fetchedData = await battle(names);
        setData(fetchedData);
      } catch (err) {
        console.error('error', err.message);
        setError(true);
      }

      setLoading(false);
      setStartBattle(false);
    })(Object.values(names));
  }, [startBattle, names]);

  function startToSetData() {
    setReadyToBattle(false);
    setStartBattle(true);
  }

  function updateNames(name, order) {
    setNames(prevNames => {
      const updated = { ...prevNames };
      updated[order] = name;
      return updated;
    });

    const isReady = Object.values(names).every(name => name !== "");
    if (isReady) setReadyToBattle(true);
  }

  return (
    <div className={showBattlePage ? "container background" : "container"}>
      <div className="grid space-between">
        <NavButton
          isActive={!showBattlePage}
          text="POPULAR STORAGE"
          onClick={() => toggleView(false)}
        />
        <NavButton
          isActive={showBattlePage}
          text="GITHUB BATTLE"
          onClick={() => toggleView(true)}
        />
      </div>

      {!showBattlePage && <Popular />}

      {showBattlePage && (
        <Battle
          data={data}
          updateNames={updateNames}
          startToSetData={startToSetData}
          initializeData={initializeData}
          readyToBattle={readyToBattle}
          loading={loading}
          error={error}
          names={names}
        />
      )}
    </div>
  );
}
