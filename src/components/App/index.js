import React, { useEffect, useState } from "react";
import { battle } from "../../utils/api";
import NavButton from "../NavButton";
import Popular from "../Popular";
import Battle from "../Battle";
import "./styles.css";

export default function App() {
  const [showBattlePage, setShowBattlePage] = useState(false);
  const [readyToBattle, setReadyToBattle] = useState(false);
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
    setData(null);
    setError(false);
    setNames({ PLAYER1: "", PLAYER2: "" });
  }

  async function setFetchedData(names) {
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
  }

  function startToSetData() {
    const values = Object.values(names);
    setFetchedData(values);
    setReadyToBattle(false);
  }

  function updateNames(name, order) {
    setNames(prevNames => {
      const updated = { ...prevNames };
      updated[order] = name;
      return updated;
    });

    const isReady = Object.values(names).every(name => name !== null);
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
