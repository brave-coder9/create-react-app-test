import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import { socket } from "./socket";
import { Dashboard } from "./components/Dashboard";
import { Room } from "./components/Room";
import { GameContextProvider } from "./contexts/GameContextProvider";

function App() {
  // Axios
  useEffect(() => {
    console.log("calling", `${process.env.REACT_APP_API_URL}/status`);
    axios
      .get(`${process.env.REACT_APP_API_URL}/status`)
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  // Socket connection
  useEffect(() => {
    // no-op if the socket is already connected
    socket.connect();
    return () => socket.disconnect();
  }, []);

  return (
    <GameContextProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </Router>
    </GameContextProvider>
  );
}

export default App;
