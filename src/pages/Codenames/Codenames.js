import { useState, useEffect, useContext } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { setId, postUpdate, postStart, postHint, postGuess, postEnd } from '../../clientAPIs/codenames';
import Board from './Board';
import AgentMap from './AgentMap';
import { Context as GlobalContext } from '../../context/GlobalContext';

import { useAuth0 } from '@auth0/auth0-react';

const Codenames = () => {

  const { user, isLoading, isAuthenticated } = useAuth0();

  const { 
    codenames: {
      gameId,
      setGameId
    }
  } = useContext(GlobalContext);

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
  const [screenWidth, setWidth] = useState(window.innerWidth);
  // const [gameId, setGameId] = useState("");
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
    team: '',
    board: []
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
    if( gameId !== id ) {
      setGameId(id, player);
      setId(id);
    } else {
      console.log("Game ID did not change from:", id);
    }
  };

  const handleOnChangeGame = (gameData) => {
    if( JSON.stringify(game) !== JSON.stringify(gameData) ) {
      setGame(gameData);
      console.log("Updated game to:" , gameData);
    } else {
      console.log("Game did not change from: ", gameData);
    }
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
        gameRes = postStart(player);
        break;
      case actions.HINT:
        if( player.team !== game.team ) {
          return;
        }
        gameRes = postHint(player, hint, number);
        document.getElementById('hintWord').value = '';
        document.getElementById('hintNum').value = 1;
        break;
      case actions.GUESS:
        if( player.team !== game.team ) {
          return;
        }
        gameRes = postGuess(player, extraParm);
        break;
      case actions.END:
        if( player.team !== game.team ) {
          return;
        }
        gameRes = postEnd(player);
        break;
      case actions.UPDATE:
        gameRes = postUpdate(player);
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
        hideElements(data.game.winner, data.game.phase);

      })

  }

  function hideElements(gameWinner, gamePhase) {

    var winnerStr = document.getElementById('winner');
    var teamTurnStr = document.getElementById('team');
    var blueLeftStr = document.getElementById('blueLeft');
    var redLeftStr = document.getElementById('redLeft');
    var phaseStr = document.getElementById('phase');
    var hintStr = document.getElementById('hint');
    var guessesStr = document.getElementById('guessesLeft');
    
    if( gameWinner !== '' ) {
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
    hintStr.hidden = (gamePhase === 'Hinting' ? true : false);
    guessesStr.hidden = (gamePhase === 'Hinting' ? true : false);

  }

  function onClickCard(guessWord) {

    handleOnSubmit(actions.GUESS, guessWord);

  }

  console.log("Page rendered");

  useEffect( (player) => {
    const interval = setInterval(() => {
      let retData = postUpdate(player);
      retData
        .then(data => {
          if( typeof data != 'undefined' ) {
            handleOnChangeGameId(data.gameId);
            handleOnChangeGame(data.game);
            hideElements(data.game.winner, data.game.phase);
          } else {
            console.log("Error: Polling failed to return a valid response");
          }
        })
    }, 1000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    function handleOnResize() {
      setWidth(window.innerWidth);
      console.log('Window resized to ', window.innerWidth, 'px wide');
    }
    window.addEventListener('resize', handleOnResize);
  });

  var gridColumnValue = Math.floor((screenWidth - 500) / 2).toString() + 'px 500px ' + Math.floor((screenWidth - 500) / 2).toString() + 'px';

  return (
   
    <div style={{
      display: 'grid',
      width: '100%',
      gridTemplateColumns: gridColumnValue,
      gridGap: '5px'
    }}>

      <div name="info">
        <h1 id="winner" hidden='true'>The {game.winner} team has won!</h1>
        <h1 id="team" hidden='true'>It is currently the {game.team} team's turn</h1>
        <h2 id="blueLeft" hidden='true'>Blue Agents Left: {game.blueLeft}</h2>
        <h2 id="redLeft" hidden='true'>Red Agents Left: {game.redLeft}</h2>
        <p id="phase" hidden='true'>Waiting for the {game.team} team's {game.phase === 'Hinting' ? 'Spymaster to give a hint' : 'Agents to make a guess'} </p>
        <p id="hint" hidden='true'>The hint provided is [{game.hint.word}, {game.hint.number}]</p>
        <p id="guessesLeft" hidden='true'>The {game.team} team has {game.guessesLeft} guesses left</p>
      </div>

      <div name="Board">

        { player.role === 'Spymaster' ?

          <div id='spymaster_view'>
            <AgentMap cards={game.board} />
            <br /><br />
            <div>
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
          </div>
        
          :

          <Board cards={game.board} handleClick={onClickCard} />
        }
      </div>

      <div name="inputs">

        <br />
          
        <InputLabel>Game ID:
          <Input type="text" id="joinId" onChange={event => handleOnChangeGameId(event.target.value)} />
        </InputLabel>

        <br />

        <Button variant="contained" onClick={() => handleOnSubmit(actions.START)}>
          Start a New Game
        </Button>

        <br /><br /><br /><br ></br>

        <Button variant="contained" onClick={() => handleOnChangePlayer({team: (player.team === 'Blue' ? 'Red' : 'Blue')})}>
          Switch to {player.team === 'Blue' ? 'Red' : 'Blue'} team
        </Button>
        <br /><br />
        <Button variant="contained" onClick={() => handleOnChangePlayer({role: (player.role === 'Agent' ? 'Spymaster' : 'Agent')})}>
          Switch to {player.role === 'Agent' ? 'Spymaster' : 'Agent'}
        </Button>

        <br /><br />

        <Button variant="contained" onClick={() => handleOnSubmit(actions.END)}>
          End Turn
        </Button>

        <p id="game">Game ID: {gameId}</p>
        <p id="username">User Name: {player.username}</p>
        <p id="userid">User ID: {player.userid}</p>
        <p id="playerTeam">Team: {player.team}</p>
        <p id="playerRole">Role: {player.role}</p>

      </div>

    </div>

  );
};

export default Codenames;
