import { useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { setGameid, setUser, postUpdate, postStart, postHint, postGuess, postEnd } from '../../clientAPIs/codenames';
import Board from './Board';
import AgentMap from './AgentMap';

import { useAuth0 } from '@auth0/auth0-react';

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
  const [gameId, setGameId] = useState("");
  const [player, setPlayer] = useState({
    userid: (!isLoading && isAuthenticated ? user.sub : 'Guest'),
    username: (!isLoading && isAuthenticated ? user.nickname : 'Guest'),
    team: 'Blue',
    role: 'Agent'
  });
  const [game, setGame] = useState({
    grid: [],
    map: [],
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

  const handleOnChangeGameId = (id) => {
    setGameId(id);
    console.log("Game ID:", id);
    handleOnSubmit(actions.UPDATE);
  };

  const handleOnChangeGame = (gameData) => {
    setGame(gameData);
    console.log("Game: ", gameData);
  }

  const handleOnChangePlayer = (playerData) => {

    // Get current values
    let newPlayerData = {
      userid: ('userid' in playerData ? playerData.userid : player.userid),
      username: ('username' in playerData ? playerData.username : player.username),
      team: ('team' in playerData ? playerData.team : player.team),
      role: ('role' in playerData ? playerData.role : player.role)
    }

    document.getElementsByClassName('AgentMap').hidden = (newPlayerData.role === 'Spymaster');

    setPlayer(newPlayerData);
    console.log("Player: ", playerData);

  }

  const handleOnSubmit = (subAction, extraParm = null) => {

    var gameRes = null;

    switch(subAction) {

      case actions.START:
        gameRes = postStart();
        break;
      case actions.HINT:
        gameRes = postHint(hint, number);
        document.getElementById('hintWord').value = '';
        document.getElementById('hintNum').value = 1;
        break;
      case actions.GUESS:
        console.log("handleOnSubmit exrraParm: ", extraParm);
        gameRes = postGuess(extraParm);
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

    if( gameId === '' && gameRes == null ) {
      return;
    }

    gameRes
      .then( data => {
        console.log(data);

        if( typeof data == 'undefined' ) {
          console.log("Error: returned data is undefined!");
          return;
        }

        handleOnChangeGameId(data.gameId);
        handleOnChangeGame(data.game);
        
        var winnerStr = document.getElementById('winner');
        var teamTurnStr = document.getElementById('team');
        var blueLeftStr = document.getElementById('blueLeft');
        var redLeftStr = document.getElementById('redLeft');
        var phaseStr = document.getElementById('phase');
        var hintStr = document.getElementById('hint');
        var guessesStr = document.getElementById('guessesLeft');

        // Cannot use game state variable here because there is a very real possibility useState() has not returned yet
        
        if( data.game.winner !== '' ) {
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
        console.log("Hinting?:", (data.game.phase === 'Hinting' ? true : false));
        hintStr.hidden = (data.game.phase === 'Hinting' ? true : false);
        guessesStr.hidden = (data.game.phase === 'Hinting' ? true : false);

      })

  }

  function pollServer() {

    console.log("Calling pollServer()");

    clearInterval(intervalVar);
    intervalVar = setInterval(handleOnSubmit(actions.UPDATE), 1000);

  }

  function onClickCard(guessWord) {

    console.log("onClickCard:", guessWord);

    //handleOnChangeGuess(guessWord);
    handleOnSubmit(actions.GUESS, guessWord);

  }

  return (
    <div>

      <br />

      <Board cards={game.grid} handleClick={onClickCard} />

      <br /><br />

      <AgentMap cards={game.map} />

      <br /><br /><br /><br />

      <h1 id="winner" hidden='true'>The {game.winner} team has won!</h1>
      <h1 id="team" hidden='true'>It is currently the {game.team} team's turn</h1>
      <h2 id="blueLeft" hidden='true'>Blue Agents Left: {game.blueLeft}</h2>
      <h2 id="redLeft" hidden='true'>Red Agents Left: {game.redLeft}</h2>
      <p id="phase" hidden='true'>Waiting for the {game.team} team's {game.phase === 'Hinting' ? 'Spymaster to give a hint' : 'Agents to make a guess'} </p>
      <p id="hint" hidden='true'>The hint provided is [{game.hint.word}, {game.hint.number}]</p>
      <p id="guessesLeft" hidden='true'>The {game.team} team has {game.guessesLeft} guesses left</p>

      <br /><br /><br />

      <div id='player_inputs'>
        <Button variant="contained" onClick={() => handleOnChangePlayer({team: (player.team === 'Blue' ? 'Red' : 'Blue')})}>
          Switch to {player.team === 'Blue' ? 'Red' : 'Blue'} team
        </Button>
        <Button variant="contained" onClick={() => handleOnChangePlayer({role: (player.role === 'Agent' ? 'Spymaster' : 'Agent')})}>
          Switch to {player.role === 'Agent' ? 'Spymaster' : 'Agent'}
        </Button>
      </div>

      <div id='join_inputs'>
        <br /><br /><br />
        <InputLabel>Game ID:
          <Input type="text" id="joinId" onChange={event => handleOnChangeGameId(event.target.value)} />
        </InputLabel>
        <br />
        <Button variant="contained" onClick={() => setGameid(gameId)}>
          Set Game ID
        </Button>
      </div>

      <br /><br /><br />

      <Button variant="contained" onClick={() => handleOnSubmit(actions.START)}>
        Start a New Game
      </Button>

      <br /><br /><br />

      <div id='hint_inputs'>
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
      </div>

      <br /><br /><br />

      <Button variant="contained" onClick={() => handleOnSubmit(actions.END)}>
        End Turn
      </Button>

      <br /><br /><br />

      <p id="game">Game ID: {gameId}</p>
      <p id="username">User Name: {player.username}</p>
      <p id="userid">User ID: {player.userid}</p>
      <p id="playerTeam">Team: {player.team}</p>
      <p id="playerRole">Role: {player.role}</p>

    </div>
  );
};

export default Codenames;