import { useState } from 'react';

const useCodenamesContext = () => {

  const [gameId, setGameId] = useState("");

  return {
    setGameId,
    gameId
  };
};

export default useCodenamesContext;