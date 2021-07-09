import React from "react";
import "./styles.css";

export default function Profile({ player: { profile, score }, index }) {
  const {
    avatar_url,
    name,
    location,
    followers,
    following,
    public_repos
  } = profile;

  return (
    <li className="player">
      <p className="score">{score}</p>
      <p className={index === 0 ? "title titleStyle" : "title"}>{name}</p>
      <section className="profile">
        <img className="profileImage" src={avatar_url} alt="profile-img" />
        <div className="profileText">
          <p>Location: {location}</p>
          <p>Followers: {followers}</p>
          <p>Following: {following}</p>
          <p>Repositories: {public_repos}</p>
        </div>
      </section>
    </li>
  );
}
