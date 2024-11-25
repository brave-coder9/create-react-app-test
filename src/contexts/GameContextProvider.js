import React, { createContext, useState } from "react";

const GameContext = createContext({});

const GameContextProvider = ({ children }) => {
  const [roomCode, setRoomCode] = useState("");

  return (
    <GameContext.Provider value={{ roomCode, setRoomCode }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider, GameContext };
