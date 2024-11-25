import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { GameContext } from "../contexts/GameContextProvider";

export function Room() {
  const { roomCode } = useContext(GameContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log({ roomCode });
    if (!roomCode) return;
    socket.emit("joinGroup", { group: roomCode });
  }, [roomCode]);

  useEffect(() => {
    const onTestMsg = ({ msg }) => {
      setMessage(`Test Msg: ${msg}`);
    };
    socket.on("testMsg", onTestMsg);
    return () => socket.off("testMsg", onTestMsg);
  }, []);

  return (
    <div style={{ margin: 100 }}>
      <div>
        <p>Message:</p>
        <p>{message}</p>
      </div>
    </div>
  );
}
