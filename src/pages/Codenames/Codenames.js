import { useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
//import { postHint } from '../../clientAPIs/codenames';

const Codenames = () => {


  /*
    Was originally in input_scripts.js
  */

  const baseURL = "http://localhost:8080/codenames";

  var gameId = '';

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

  // Uses ajax to ask the server for the current game state, and then updating the page
  function ajaxUpdate() {

    // https://www.w3schools.com/whatis/whatis_ajax.asp
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if( this.readyState === 4 && this.status === 200 ) {
        updateScreen(JSON.parse(this.responseText));
      }
    };
    xhttp.open('GET', baseURL + "/update", true);
    xhttp.send();

  }

  // Sends the GET requests with ajax instead of reloading the page
  function ajaxSend(inputType) {

    var queryStr = '';

    switch(inputType) {

      case 0:  // Start a new game
        queryStr = 'start=start';
        break;
      case 1:  // Give a hint
        queryStr = "hintWord=" + hint + "&hintNum=" + number;
        break;
      case 2:  // Make a guess
        queryStr = "guessWord=" + guess;
        break;
      case 3:  // End the turn
        queryStr = "endTurn=1";
        break;
      default:
        alert("Invalid input");
        return;
    }

    console.log(queryStr);

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if( this.readyState === 4 && this.status === 200 ) {
        updateScreen(JSON.parse(this.responseText));
      }
    };
    xhttp.open('GET', baseURL + "/update?" + queryStr, true);
    xhttp.setRequestHeader('Access-Control-Reques-Headers', '*');
    xhttp.send();

  }

  /*
    Actual JSX stuff
  */


  const [hint, setHint] = useState("");
  const [number, setNumber] = useState(0);
  const [guess, setGuess] = useState("");

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
  }

  const handleOnSubmit = (subType) => {
    console.log("Submit button clicked!");
    // API function that will send hint to back end server
    ajaxSend(subType);
  }

  // Start updating
  setInterval(ajaxUpdate, 1000);


  return (
    <body>
      <table id='grid'>
        <tbody>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      <br/>

      <table id='map'>
        <tbody>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
          <tr>
            <td></td><td></td><td></td><td></td><td></td>
          </tr>
        </tbody>
      </table>

      <br/>

      <h1 id="winner">temp</h1>
      <h1 id="team">temp</h1>
      <h2 id="blueLeft">temp</h2>
      <h2 id="redLeft">temp</h2>
      <p id="phase">temp</p>
      <p id="hint">temp</p>
      <p id="guessesLeft">temp</p>

      <br /><br />

      <Button variant="contained" onClick={() => handleOnSubmit(0)}>
        Start a New Game
      </Button>

      <br /><br /><br /><br />

      <InputLabel>Hint Word:
        <Input type="text" onChange={event => handleOnChangeHint(event.target.value)} />
      </InputLabel>
      <InputLabel>Hint Number:
        <Input type="number" onChange={event => handleOnChangeNumber(event.target.value)} />
      </InputLabel>
      <br />
      <Button variant="contained" onClick={() => handleOnSubmit(1)}>
        Submit Hint
      </Button>

      <br /><br /><br /><br />

      <InputLabel>Guess Word:
        <Input type="text" onChange={event => handleOnChangeGuess(event.target.value)} />
      </InputLabel>
      <br />
      <Button variant="contained" onClick={() => handleOnSubmit(2)}>
        Submit Guess
      </Button>

      <br /><br /><br /><br />

      <Button variant="contained" onClick={() => handleOnSubmit(3)}>
        End Turn
      </Button>
    </body>
  );
};

export default Codenames;