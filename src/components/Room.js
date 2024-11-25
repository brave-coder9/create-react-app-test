import React, { useEffect, useState } from "react";
import { socket } from "../socket";

export function Room() {
  const [message, setMessage] = useState("");

  const [joinOneState, setJoinOneState] = useState(false);
  useEffect(() => {
    socket.emit("joinOneId", { oneId: "aaa-111" });
  }, []);
  useEffect(() => {
    const onJoinOneId = ({ oneId }) => {
      console.log({ oneId });
      setJoinOneState(true);
    };
    socket.on("joinOneId", onJoinOneId);
    return () => socket.off("joinOneId", onJoinOneId);
  }, []);

  useEffect(() => {
    const onTestMsg = ({ oneId, msg }) => {
      setMessage(`Test Msg: ${msg}, oneId: ${oneId}`);
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
