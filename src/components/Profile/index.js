import React from "react";
import "./styles.css";

export default function Profile({ user: { profile, score }, index }) {
  const {
    avatar_url,
    name,
    location,
    login,
    followers,
    following,
    public_repos
  } = profile;

  return (
    <li className="user">
      <p className={index === 0 ? "title titleStyle" : "title"}>{name ? name : login }</p>
      <p className="score">{score}</p>
      <section className="profile">
        <img className="profileImage" src={avatar_url} alt="profile-img" />
        <div className="profileText">
          <p className="text">Location: {location}</p>
          <p className="text">Followers: {followers}</p>
          <p className="text">Following: {following}</p>
          <p className="text">Repositories: {public_repos}</p>
        </div>
      </section>
    </li>
  );
}
