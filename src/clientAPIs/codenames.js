import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

const baseGameServerAddress = 'localhost:8080/codenames'; // "http://backend-dot-second-folio-294223.nn.r.appspot.com"

var gameId = '';
var playerTeam = '';
var playerRole = '';

/*
export const postHint = (hint, number) => {
  console.log("Posting Hint:", hint);

  let body = {
    hint: hint,
    number: number
  };

  let p = axios.post("/api/codenames", body, {
    headers: {
      "Content-Type": "application/json",
    }
  });

  return p
    .then(res => {
      console.log("Posted hint to to the backend!");
      console.log("RESPONSE", res);
      return res;
    })
    .catch(err => {
      console.log("Error", err);
    });
}
*/

// Not sure if this is needed, but I need some way to see the gameId
export const setGameId = (id) => {

  gameId = id;
  console.log("Set gameId to [" + id + "]");

}

// Same as above
export const setTeamRole = (team, role) => {

  playerTeam = team;
  playerRole = role;
  console.log("User joined team [" + team + "] as a(n) [" + role + "]")

}

// Handles actually posting messages
export const postMessage = (body) => {

  const { user } = useAuth0();

  body.userid = user.sub;
  body.username = user.nickname;
  body.team = playerTeam;
  body.role = playerRole;

  let p = axios.post(baseGameServerAddress + "/game/" + gameId, body, {
    header: {
      "Content-Type": "application/json"
    }
  });

  return p
    .then(res => {
      console.log("postHint returned successfully");
      return res;
    })
    .catch(err => {
      console.log("Error: postMessage failed while sending a [" + body.action + "] with error:", err);
    })

}

// Ask the server for an update
export const postUpdate = () {

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

  console.log("Posting guess: [" + hint + "]");

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