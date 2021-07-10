import "./styles.css";
import Input from "../Input";
import Profile from '../Profile';
import Button from '../Button';
import Loading from '../Loading';
import { WINNER_COMMENT, LOADING_COMMENT, ERROR_COMMENT } from "../../constants/battlegrounds";

export default function Battle({ data, updateNames, startToSetData, initializeData, readyToBattle, loading, error }) {
  const PLAYERS = { NO1: "PLAYER1", NO2: "PLAYER2" };

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
              readyToStart={readyToBattle}
              submitData={startToSetData}
            />
          ))}
        </ul>
      </section>
    </>
  );
}
