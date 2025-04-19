import { useState } from "react";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      onLogin(username);
    } else {
      alert("Please enter a username!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>💬 Welcome to Chat App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", width: "250px" }}
        />
        <br />
        <button
          type="submit"
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Join Chat
        </button>
      </form>
    </div>
  );
}

export default Login;
