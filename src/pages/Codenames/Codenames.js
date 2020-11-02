import { useState } from 'react';
import { InputLabel, Input, Button } from '@material-ui/core';
import { postHint } from '../../clientAPIs/codenames';

const Codenames = () => {
  const [hint, setHint] = useState("");
  const [number, setNumber] = useState(0);

  const handleOnChangeHint = (hint) => {
    setHint(hint);
    console.log("Hint", hint);
  };

  const handleOnChangeNumber = (number) => {
    setNumber(number);
    console.log("Number", number);
  };

  const handleOnSubmit = () => {
    console.log("Submit button clicked!");
    // API function that will send hint to back end server
    postHint(hint, number);
  }

  return (
    <div>
      <h1 id="turn_msg">It is currently Blue's turn</h1>
      <h2 id="turn_state">Waiting for a hint from the spymaster</h2>
      <h2 id="hint_msg">The hint is {hint} : {number}</h2>
      <p id="blue_counter">Blue: 9</p>
      <p id="red_counter">Red: 8</p>
      <InputLabel>Hint:
        <Input type="text" onChange={event => handleOnChangeHint(event.target.value)} />
      </InputLabel>
      <br></br>
      <InputLabel>Number:
        <Input type="number" onChange={event => handleOnChangeNumber(event.target.value)}/>
      </InputLabel>
      <br></br>
      <br></br>
      <Button
        variant="contained"
        onClick={() => handleOnSubmit()}
      >
        Submit
      </Button>
    </div>
  );
};

export default Codenames;