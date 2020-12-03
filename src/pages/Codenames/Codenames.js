import { useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { setGameId, setUser, postUpdate, postStart, postHint, postGuess, postEnd } from '../../clientAPIs/codenames';
import Card from './Card';

import { useAuth0 } from '@auth0/auth0-react';

const Codenames = () => {

  const { user } = useAuth0();

  // enums don't exist in JavaScript and this is the next best thing according to StackOverflow...
  // https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
  const actions = {
    START: 'start',
    HINT: 'hint',
    GUESS: 'guess',
    END: 'end',
    UPDATE: 'update'
  }

  /*
    Was originally in input_scripts.js
  */

  // Updates the page with the info pulled from the server
  // GameData should be what is returned from updateURL, parsed with JSON.parse()
  function updateScreen( gameData ) {
    
    // Get all the elements on the page that we need to possibly update
    var gridElm = document.querySelectorAll('#grid td');
    var mapElm = document.querySelectorAll('#map td');
    var winnerStr = document.getElementById('winner');
    var teamTurnStr = document.getElementById('team');
    var blueLeftStr = document.getElementById('blueLeft');
    var redLeftStr = document.getElementById('redLeft');
    var phaseStr = document.getElementById('phase');
    var hintStr = document.getElementById('hint');
    var guessesStr = document.getElementById('guessesLeft');
    var gameStr = document.getElementById("game");

    // Update the map and grid
    for(var i = 0; i < 25; i++) {
      gridElm[i].innerText = gameData.grid[i].word;
      gridElm[i].style.backgroundColor = (gameData.grid[i].colour === 'None' ? 'white' : gameData.grid[i].colour);
      if( gameData.grid[i].colour === 'Black' ) {
        gridElm[i].style.color = 'White';
      } else {
        gridElm[i].style.color = 'Black';
      }

      mapElm[i].innerText = gameData.map[i].type;
      mapElm[i].style.backgroundColor = gameData.map[i].colour;
      if( gameData.map[i].colour === 'Black' ) {
        mapElm[i].style.color = 'White';
      } else {
        mapElm[i].style.color = 'Black';
      }
    }

    // Special case for if there is a winner
    if( gameData.winner !== '' ) {
      winnerStr.innerText = "The " + gameData.winner + " team has won";
      winnerStr.hidden = false;
      teamTurnStr.hidden = true;
      blueLeftStr.hidden = true;
      redLeftStr.hidden = true;
      phaseStr.hidden = true;
      hintStr.hidden = true;
      guessesStr.hidden = true;
      return;
    } else {
      winnerStr.hidden = true;
      teamTurnStr.hidden = false;
      blueLeftStr.hidden = false;
      redLeftStr.hidden = false;
      phaseStr.hidden = false;
    }

    teamTurnStr.innerText = "It is currently the " + gameData.team + " team's turn";
    blueLeftStr.innerText = "Blue Agents Left: " + gameData.blueLeft;
    redLeftStr.innerText = "Red Agents Left: " + gameData.redLeft;

    if( gameData.phase === 'Hinting' ) {
      phaseStr.innerText = "Waiting for the " + gameData.team + " team's spymaster to give a hint";
      hintStr.hidden = true;
      guessesStr.hidden = true;

    } else {
      phaseStr.innerText = "Waiting for the " + gameData.team + " team to make a guess";
      hintStr.innerText = "The hint is: [" + gameData.hint.word + ", " + gameData.hint.number + "]";
      hintStr.hidden = false;
      guessesStr.innerText = "The " + gameData.team + " team has " + gameData.guessesLeft + " guesses left";
      guessesStr.hidden = false;
    }

    gameStr.innerText = "Game ID: " + gameId;

  }


  /*
    Actual JSX stuff
  */


  const [hint, setHint] = useState("");
  const [number, setNumber] = useState(0);
  const [guess, setGuess] = useState("");
  const [playerTeam, setTeam] = useState("");
  const [playerRole, setRole] = useState("");
  const [gameId, setGameId] = useState("");

  const handleOnChangeHint = (hint) => {
    setHint(hint);
    console.log("Hint", hint);
  };

  const handleOnChangeNumber = (number) => {
    setNumber(number);
    console.log("Number", number);
  };

  const handleOnChangeGuess = (guess) => {
    setGuess(guess);
    console.log("Guess", guess);
  };

  const handleOnChangeTeam = (team) => {
    setTeam(team);
    console.log("Team", team);
  };

  const handleOnChangeRole = (role) => {
    setRole(role);
    console.log("Role", role);
  };

  const handleOnChangeGameId = (id) => {
    setGameId(id);
    console.log("Game ID:", id);
  };

  const handleOnSubmit = (subAction) => {

    switch(subAction) {

      case actions.START:
        // Do something
        break;
      case actions.HINT:
        // Do something
        break;
      case actions.GUESS:
        // Do something
        break;
      case actions.END:
        // Do something
        break;
      case actions.UPDATE:
        // Do something

    }

  }

  return (
    <div>

		<br />
		<h1 id="winner"></h1>
		<h1 id="team"></h1>
		<h2 id="blueLeft"></h2>
		<h2 id="redLeft"></h2>
		<p id="phase"></p>
		<p id="hint"></p>
		<p id="guessesLeft"></p>

    {/* <Button variant="contained" onclick={() =>}>
      Start Updates
    </Button>

    <Button variant="contained" onclick={() =>}>
      Stop Updates
    </Button> */}

    <Card word="hi" color="Red" onClick={() => postGuess()} />

    <InputLabel>Team:
      <Input type="text" id="formTeam" onChange={event => handleOnChangeTeam(event.target.value)} />
    </InputLabel>
    <InputLabel>Role:
      <Input type="text" id="formRole" onChange={event => handleOnChangeRole(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => setUser(user.sub, user.nickname, playerTeam, playerRole)}>
      Set Team and Role
    </Button>

    <br /><br /><br /><br />

		<Button variant="contained" onClick={() => postStart()}>
      Start a New Game
    </Button>

    <br /><br /><br /><br />

    <InputLabel>Game ID:
      <Input type="text" id="joinId" onChange={event => handleOnChangeGameId(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => setGameId(gameId)}>
      Set Game ID
    </Button>

    <br /><br /><br /><br />

		<InputLabel>Hint Word:
      <Input type="text" id="hintWord" onChange={event => handleOnChangeHint(event.target.value)} />
    </InputLabel>
    <InputLabel>Hint Number:
      <Input type="number" id="hintNum" onChange={event => handleOnChangeNumber(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => postHint(hint, number)}>
      Submit Hint
    </Button>

    <br /><br /><br /><br />

		<InputLabel>Guess Word:
      <Input type="text" id="guessWord" onChange={event => handleOnChangeGuess(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => postGuess(guess)}>
      Submit Guess
    </Button>

    <br /><br /><br /><br />

		<Button variant="contained" onClick={() => postEnd()}>
      End Turn
    </Button>

    <br /><br /><br /><br />

		<p id="game"></p>
		<p id="username"></p>
		<p id="userid"></p>
		<p id="playerTeam"></p>
		<p id="playerRole"></p>

    </div>
  );
};

export default Codenames;