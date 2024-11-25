import React, { useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { GameContext } from "../contexts/GameContextProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { roomCode, setRoomCode } = useContext(GameContext);
  const [name, setName] = useState("");

  const [players, setPlayers] = useState([]);
  useEffect(() => {
    const onHostRoom = ({ players, code }) => {
      setPlayers(players);
      setRoomCode(code);
      socket.emit("joinGroup", { group: `${code}` });
    };
    socket.on("hostRoom", onHostRoom);
    return () => socket.off("hostRoom", onHostRoom);
  }, [setRoomCode]);

  const beginHost = () => {
    if (!name) alert("name field is required");
    socket.emit("host", { username: name });
  };

  const sendTest = () => {
    console.log({ roomCode });
    socket.emit("test", { group: roomCode, msg: `chat from ${name}` });
    navigate("/room");
  };
  const [message, setMessage] = useState("");

  useEffect(() => {
    const onTestMsg = ({ msg }) => {
      setMessage(`Test Msg: ${msg}`);
    };
    socket.on("testMsg", onTestMsg);
    return () => socket.off("testMsg", onTestMsg);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", margin: 40 }}>
      <p style={{ margin: 100 }}>Dashboard</p>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <p>Name: </p>
        <input onChange={(e) => setName(e.target.value)} />
      </div>
      <button onClick={beginHost} style={{ margin: 20 }}>
        Host Game
      </button>
      <div style={{ border: "1px solid" }}>
        <p>Code: {roomCode}</p>
      </div>
      <div style={{ border: "1px solid" }}>
        <p>Players:</p>
        {players.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <a href="/room">Go to Room</a>
      <br />
      <button onClick={sendTest} style={{ margin: 20 }}>
        Emit `test` to server
      </button>
      <div>{message}</div>
    </div>
  );
};

export { Dashboard };
