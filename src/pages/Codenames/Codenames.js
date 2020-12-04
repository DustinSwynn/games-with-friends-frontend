import { useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { setGameid, setUser, postUpdate, postStart, postHint, postGuess, postEnd } from '../../clientAPIs/codenames';
import Board from './Board';
import AgentMap from './AgentMap';

import { useAuth0 } from '@auth0/auth0-react';
import { blue } from '@material-ui/core/colors';

const Codenames = () => {

  const { user, isLoading, isAuthenticated } = useAuth0();

  var intervalVar;

  // enums don't exist in JavaScript and this is the next best thing according to StackOverflow...
  // https://stackoverflow.com/questions/287903/what-is-the-preferred-syntax-for-defining-enums-in-javascript
  const actions = {
    START: 'start',
    HINT: 'hint',
    GUESS: 'guess',
    END: 'end',
    UPDATE: 'update'
  }

  // Input state variables

  const [hint, setHint] = useState("");
  const [number, setNumber] = useState(1);
  const [guess, setGuess] = useState("");
  const [playerTeam, setTeam] = useState('Blue');
  const [playerRole, setRole] = useState('Agent');
  const [gameId, setGameId] = useState("");
  const [board, setBoard] = useState([]);
  const [agentMap, setAgentMap] = useState([]);
  const [gameState, setGameState] = useState({
    winner: '',
    phase: '',
    blueLeft: 0,
    redLeft: 0,
    hint: {
      word: '',
      number: 0
    },
    guessesLeft: 0,
    team: ''
  });
  

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
    //setUser((!isLoading && isAuthenticated ? user.sub : 'Guest'), (!isLoading && isAuthenticated ? user.nickname : 'Guest'), playerTeam, playerRole);
  };

  const handleOnChangeRole = (role) => {
    setRole(role);
    console.log("Role", role);
    //setUser((!isLoading && isAuthenticated ? user.sub : 'Guest'), (!isLoading && isAuthenticated ? user.nickname : 'Guest'), playerTeam, playerRole)
  };

  const handleOnChangeGameId = (id) => {
    setGameId(id);
    console.log("Game ID:", id);
  };

  const handleOnChangeGameState = (gameState) => {
    setGameState(gameState);
    console.log("Game State: ", gameState);
  }

  const handleOnSubmit = (subAction) => {

    var gameRes = null;

    switch(subAction) {

      case actions.START:
        gameRes = postStart();
        break;
      case actions.HINT:
        gameRes = postHint(hint, number);
        break;
      case actions.GUESS:
        console.log(guess);
        gameRes = postGuess(guess);
        break;
      case actions.END:
        gameRes = postEnd();
        break;
      case actions.UPDATE:
        gameRes = postUpdate();
        break;
      default:
        console.log("Error: Unexpected subAction [" + subAction + "] received in handleOnSubmit!");
        return;

    }

    document.getElementById('inputTeam').value = '';
    document.getElementById('inputRole').value = '';
    document.getElementById('hintWord').value = '';
    document.getElementById('hintNum').value = 1;

    gameRes
      .then( data => {
        console.log(data);

        if( typeof data == 'undefined' ) {
          console.log("Error: returned data is undefined!");
          return;
        }

        var gameStateData = {
          winner: data.game.winner,
          phase: data.game.phase,
          blueLeft: data.game.blueLeft,
          redLeft: data.game.redLeft,
          hint: {
            word: data.game.hint.word,
            number: data.game.hint.number
          },
          guessesLeft: data.game.guessesLeft,
          team: data.game.team
        }

        setGameId(data.gameId);
        setBoard(data.game.grid);
        setAgentMap(data.game.map);
        setGameState(gameStateData);
        
        var winnerStr = document.getElementById('winner');
        var teamTurnStr = document.getElementById('team');
        var blueLeftStr = document.getElementById('blueLeft');
        var redLeftStr = document.getElementById('redLeft');
        var phaseStr = document.getElementById('phase');
        var hintStr = document.getElementById('hint');
        var guessesStr = document.getElementById('guessesLeft');
       
        document.getElementById('join_inputs').hidden = (gameId == '' ? false : true);
        
        if( gameState.winner != '' ) {
          winnerStr.hidden = false;
          teamTurnStr.hidden = true;
          blueLeftStr.hidden = true;
          redLeftStr.hidden = true;
          phaseStr.hidden = true;
          hintStr.hidden = true;
          guessesStr.hidden = true;
          return;
        }

        winnerStr.hidden = true;
        teamTurnStr.hidden = false;
        blueLeftStr.hidden = false;
        redLeftStr.hidden = false;
        phaseStr.hidden = false;
        hintStr.hidden = (gameState.phase == 'Hinting' ? true : false);
        guessesStr.hidden = (gameState.phase == 'Hinting' ? true : false);

      })

  }

  function startUpdating() {
    stopUpdating();
    intervalVar = setInterval(handleOnSubmit(actions.UPDATE), 1000);
  }

  function stopUpdating() {
    clearInterval(intervalVar);
  }

  function onClickCard(guessWord) {

    console.log(guessWord);

    handleOnChangeGuess(guessWord);
    handleOnSubmit(actions.GUESS);

  }

  return (
    <div>

    <br />

    <Board cards={board} handleClick={onClickCard} />

    <br /><br />

    <AgentMap cards={agentMap} />

    <br /><br /><br /><br />

    <h1 id="winner" hidden='true'>The {gameState.winner} has won!</h1>
		<h1 id="team" hidden='true'>It is currently the {gameState.team}'s turn</h1>
		<h2 id="blueLeft" hidden='true'>Blue Agents Left: {gameState.blueLeft}</h2>
		<h2 id="redLeft" hidden='true'>Red Agents Left: {gameState.redLeft}</h2>
		<p id="phase" hidden='true'>Waiting for the {gameState.team}'s {gameState.phase == 'hinting' ? 'Spymaster to give a hint' : 'Agents to make a guess'} </p>
		<p id="hint" hidden='true'>The hint provided is [{gameState.hint.word}, {gameState.hint.number}]</p>
		<p id="guessesLeft" hidden='true'>The {gameState.team} team has {gameState.guessesLeft} guesses left</p>

    {/* <Button variant="contained" onclick={() => startUpdating()}>
      Start Updates
    </Button>

    <Button variant="contained" onclick={() => stopUpdating()}>
      Stop Updates
    </Button>

    <br /><br /><br /><br /> */}

    {/* <Button variant="contained" onClick={handleOnChangeTeam('Blue')} >
      Blue Team
    </Button>
    <Button variant="contained" onClick={handleOnChangeTeam('Red')} >
      Red Team
    </Button>
    <br /><br />
    <Button variant="contained" onClick={handleOnChangeTeam('Agent')} >
      Agent
    </Button>
    <Button variant="contained" onClick={handleOnChangeTeam('Spymaster')} >
      Spymaster
    </Button> */}

    <InputLabel>Team:
      <Input type="text" id="inputTeam" onChange={event => handleOnChangeTeam(event.target.value)} />
    </InputLabel>
    <InputLabel>Role:
      <Input type="text" id="inputRole" onChange={event => handleOnChangeRole(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => setUser((!isLoading && isAuthenticated ? user.sub : 'Guest'), (!isLoading && isAuthenticated ? user.nickname : 'Guest'), playerTeam, playerRole)}>
      Set Team and Role
    </Button>

    <div id="join_inputs">
      <br /><br /><br /><br />
      <InputLabel>Game ID:
        <Input type="text" id="joinId" onChange={event => handleOnChangeGameId(event.target.value)} />
      </InputLabel>
      <br />
      <Button variant="contained" onClick={() => setGameid(gameId)}>
        Set Game ID
      </Button>
    </div>

    <br /><br /><br /><br />

		<Button variant="contained" onClick={() => handleOnSubmit(actions.START)}>
      Start a New Game
    </Button>

    <br /><br /><br /><br />

		<InputLabel>Hint Word:
      <Input type="text" id="hintWord" onChange={event => handleOnChangeHint(event.target.value)} />
    </InputLabel>
    <InputLabel>Hint Number:
      <Input type="number" id="hintNum" onChange={event => handleOnChangeNumber(event.target.value)} />
    </InputLabel>
    <br />
    <Button variant="contained" onClick={() => handleOnSubmit(actions.HINT)}>
      Submit Hint
    </Button>

    <br /><br /><br /><br />

		<Button variant="contained" onClick={() => handleOnSubmit(actions.END)}>
      End Turn
    </Button>

    <br /><br /><br /><br />

  <p id="game">Game ID: {gameId}</p>
  <p id="username">User Name: {(!isLoading && isAuthenticated ? user.nickname : 'Guest')}</p>
	<p id="userid">User ID: {(!isLoading && isAuthenticated ? user.sub : 'Guest')}</p>
	<p id="playerTeam">Team: {playerTeam}</p>
	<p id="playerRole">Role: {playerRole}</p>

    </div>
  );
};

export default Codenames;