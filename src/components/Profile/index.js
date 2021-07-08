import React from "react";
import "./styles.css";

export default function Profile({ player: { profile, score } }) {
  const {
    avatar_url,
    name,
    login,
    location,
    followers,
    following,
    public_repos
  } = profile;

  return (
    <li className="player">
      <p className="title">{name}</p>
      <p>{login}</p>
      <p>{score}</p>
      <div className="profile">
        <img src={avatar_url} alt="profile-img" />
        <p>Location: {location}</p>
        <p>Followers: {followers}</p>
        <p>Following: {following}</p>
        <p>Repositories: {public_repos}</p>
      </div>
    </li>
  );
}
