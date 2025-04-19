import { useState, useEffect } from "react";
import socket from "../socket";

function ChatRoom({ username }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // استقبال الرسائل من السيرفر
    socket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off("chatMessage");
    };
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      const msgData = { user: username, text: message };
      socket.emit("chatMessage", msgData);  // إرسال الرسالة للسيرفر
      setMessages((prev) => [...prev, msgData]); // عرض الرسالة فوراً
      setMessage("");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>💬 Welcome to the Chat Room, {username}!</h2>
      <div style={{
        border: "1px solid #ccc",
        height: "300px",
        width: "60%",
        margin: "20px auto",
        overflowY: "auto",
        padding: "10px",
        textAlign: "left"
      }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.user}:</strong> {msg.text}</p>
        ))}
      </div>

      <form onSubmit={handleSend}>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ padding: "10px", width: "60%" }}
        />
        <button type="submit" style={{ padding: "10px 20px", marginLeft: "10px" }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatRoom;
