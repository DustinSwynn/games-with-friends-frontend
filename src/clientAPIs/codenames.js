import axios from "axios";

const baseGameServerAddress = 'https://backend-dot-second-folio-294223.nn.r.appspot.com/codenames';

var gameId = '';

// Not sure if this is needed, but I need some way to see the gameId
export const setId = (id, playerData) => {

  gameId = id;
  console.log("Set gameId to [" + id + "]");

  postUpdate(playerData);

}

// Handles actually posting messages
export const postMessage = (body) => {

  console.log("gameId:", gameId)
  console.log("Posting body:", body);

  let p = axios.post(baseGameServerAddress + "/game/" + gameId, body, {
    header: {
      "Content-Type": "application/json"
    }
  });

  return p
    .then(res => {
      console.log("postMessage returned successfully");
      gameId = res.data.gameId;
      return res.data;
    })
    .catch(err => {
      console.log("Error: postMessage failed while sending a [" + body.action + "] with error:", err);
    })

}

// Ask the server for an update
export const postUpdate = (playerData) => {

  console.log("Posting an update request");

  return postMessage({
    action: 'update',
    ...playerData
  });

}

// Asks for the game to be started/restarted
export const postStart = (playerData) => {

  console.log("Posting start");

  return postMessage({
    action: 'start',
    ...playerData
  });

}

// Send a hint to the server
export const postHint = (playerData, hint, number) => {

  console.log("Posting hint: [" + hint + ", " + number + "]");

  return postMessage({
    action: 'hint',
    hintWord: hint,
    hintNum: number,
    ...playerData
  });

}

// Send a guess to the server
export const postGuess = (playerData, guess) => {

  console.log("Posting guess: [" + guess + "]");

  return postMessage({
    action: 'guess',
    guessWord: guess,
    ...playerData
  });

}

// Ask for the current turn to be ended
export const postEnd = (playerData) => {

  console.log("Posting end");

  return postMessage({
    action: 'end',
    ...playerData
  });

}