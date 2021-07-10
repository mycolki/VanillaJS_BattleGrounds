import React, { useState } from "react";
import Input from "../Input";
import "./styles.css";
import Profile from '../Profile';
import Button from '../Button';
import Loading from '../Loading';
import { WINNER_COMMENT, LOADING_COMMENT, ERROR_COMMENT } from "../../constants/battlegrounds";


export default function Battle({ setData, data, initializeData, loading, error }) {
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
        {(error) && <h1 className="centerText errorText">{ERROR_COMMENT}</h1>}
        {loading
          ? (<Loading text={LOADING_COMMENT} />)
          : (<h1 className="centerText">
              {data ? WINNER_COMMENT : " "}
            </h1>
        )}
        <Button
          readyToStart={readyToBattle}
          onClickStart={startToSetData}
          onClickRestart={() => initializeData()}
          data={data}
          error={error}
        />
      </header>
      <section className="playersContainer">
        <ul className="users">
          {data && data.map((item, index) => (
            <Profile
              key={item.profile.id}
              index={index}
              user={item}
            />))}

          {!data && Object.keys(PLAYERS).map(key => (
            <Input
              key={key}
              playerOrder={PLAYERS[key]}
              updateInputValue={updateNames}
              submitData={startToSetData}
              readyToStart={readyToBattle}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
