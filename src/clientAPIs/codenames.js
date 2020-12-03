import axios from "axios";

const baseGameServerAddress = 'http://localhost:8080/codenames'; // "http://backend-dot-second-folio-294223.nn.r.appspot.com"

var gameId = '';
var playerId = '';
var playerName = '';
var playerTeam = '';
var playerRole = '';
var intervalVar;

// Not sure if this is needed, but I need some way to see the gameId
export const setGameId = (id) => {

  gameId = id;
  console.log("Set gameId to [" + id + "]");

  postUpdate();

}

// Same as above
export const setUser = (userid, username, team, role) => {

  playerId = userid;
  playerName = username;
  playerTeam = team;
  playerRole = role;
  console.log("User joined team [" + team + "] as a(n) [" + role + "]")

}

// Handles actually posting messages
export const postMessage = (body) => {

  body.userid = playerId;
  body.username = playerName;
  body.team = playerTeam;
  body.role = playerRole;

  console.log("gameId:", gameId)

  let p = axios.post(baseGameServerAddress + "/game/" + gameId, body, {
    header: {
      "Content-Type": "application/json"
    }
  });

  return p
    .then(res => {
      console.log("postMessage returned successfully");
      console.log(res);
      gameId = res.data.gameId;
      return res.data;
    })
    .catch(err => {
      console.log("Error: postMessage failed while sending a [" + body.action + "] with error:", err);
    })

}

// Ask the server for an update
export const postUpdate = () => {

  console.log("Posting an update request");

  var body = {
    action: 'update'
  }

  return postMessage(body);

}

// Asks for the game to be started/restarted
export const postStart = () => {

  console.log("Posting start");

  var body = {
    action: 'start'
  }

  return postMessage(body);

}

// Send a hint to the server
export const postHint = (hint, number) => {

  console.log("Posting hint: [" + hint + ", " + number + "]");

  var body = {
    action: 'hint',
    hintWord: hint,
    hintNum: number
  }

  return postMessage(body);

}

// Send a guess to the server
export const postGuess = (guess) => {

  console.log("Posting guess: [" + guess + "]");

  var body = {
    action: 'guess',
    guessWord: guess
  }

  return postMessage(body);

}

// Ask for the current turn to be ended
export const postEnd = () => {

  console.log("Posting end");

  var body = {
    action: 'end'
  }

  return postMessage(body);

}