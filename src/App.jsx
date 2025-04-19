import { useState } from "react";
import Login from "./pages/Login";
import ChatRoom from "./pages/ChatRoom";
import socket from "./socket";

function App() {
  const [username, setUsername] = useState("");

  const handleLogin = (name) => {
    setUsername(name);
    socket.emit("join", name);
  };

  return (
    <div>
      {username === "" ? (
        <Login onLogin={handleLogin} />
      ) : (
        <ChatRoom username={username} />
      )}
    </div>
  );
}

export default App;
