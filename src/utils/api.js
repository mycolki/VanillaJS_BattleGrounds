import PROFILE from "./profile.json";
import PERSONAL_REPOS from "./personalRepositories.json";
import POPULAR_REPOS from "./popularRepos.json";

/*

  TODO: Enter your own Github client id and secret id below

  1. Visit Github.com
  2. Visit User Settings (https://github.com/settings/profile)
  3. Select "Developer Settings"
  4. Select "Oauth Apps"
  5. Select "New Oauth App"
  6. Enter "http://localhost:8080" for homepage & callback URL
  7. Enter your Client ID and Secret ID below

 */
const GITHUB_CLIENT_ID = process.env.REACT_APP_GITHUB_CLIENT_ID;
const GITHUB_SECRET_ID = process.env.REACT_APP_GITHUB_SECRET_ID;

const defaultParams = `?client_id=${GITHUB_CLIENT_ID}&client_secret=${GITHUB_SECRET_ID}`;

// NOTE: Toggle this value to use mock data.
const USE_MOCK_DATA = false;

function getErrorMsg(message, username) {
  if (message === "Not Found") {
    return `"${username}"는 존재하지 않는 사용자입니다`;
  }

  return message;
}

// TODO: Refactor with `async/await`
async function getProfile(username) {
  if (USE_MOCK_DATA) {
    return new Promise(function (resolve) {
      resolve(PROFILE);
    });
  }
  const data = await fetch(
    `https://api.github.com/users/${username}${defaultParams}`
  );

  const profile = await data.json();

  if (profile.message) throw new Error(getErrorMsg(profile.message, username));

  return profile;
}

// TODO: Refactor with `async/await`
async function getRepos(username) {
  if (USE_MOCK_DATA) {
    return new Promise(function (resolve) {
      resolve(PERSONAL_REPOS);
    });
  }

  const data = await fetch(
    `https://api.github.com/users/${username}/repos${defaultParams}&per_page=100`
  );

  const repos = await data.json();

  if (repos.message) throw new Error(getErrorMsg(repos.message, username));

  return repos;
}

function getStarCount(repos) {

  return repos.reduce(
    (count, { stargazers_count }) => count + stargazers_count,
    0
  );
}

function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

async function getUserData(player) {
  const profile = await getProfile(player);
  const repos = await getRepos(player);

  return {
    profile,
    score: calculateScore(profile.followers, repos),
  };
}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score);
}

export async function battle([player1, player2]) {
  // const promises = [getUserData(player1), getUserData(player2)];
  // return sortPlayers(Promise.allSettled(promises));
  // console.log(Promise.allSettled(promises));
  const playerOne = await getUserData(player1);
  const playerTwo = await getUserData(player2);

  return sortPlayers([playerOne, playerTwo]);
}

export async function fetchPopularRepos(language) {
  if (USE_MOCK_DATA) {
    return new Promise(function (resolve) {
      if (language === "All") return resolve(POPULAR_REPOS);

      resolve(POPULAR_REPOS.filter((repo) => repo.language === language));
    });
  }

  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories${defaultParams}&q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );

  const res = await fetch(endpoint);
  const { items } = await res.json();

  return items;
}
