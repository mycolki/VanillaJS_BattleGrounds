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
      <span className={index === 0 ? "title titleStyle" : "title"}>{name ? name : login }</span>
      <span className={index === 0 ? "score scoreStyle" : "score"}>{score}</span>
      <section className="profile">
        <img className="profileImage" src={avatar_url} alt="profile-img" />
        <div className={index === 0 ? "profileText profileTextStyle" : "profileText"}>
          <span className="text">Location: {location}</span>
          <span className="text">Followers: {followers}</span>
          <span className="text">Following: {following}</span>
          <span className="text">Repositories: {public_repos}</span>
        </div>
      </section>
    </li>
  );
}
