const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // عنوان Vite dev server
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("✅ User connected:", socket.id);

  socket.on("join", (username) => {
    console.log(`👋 User joined: ${username}`);
  });

  socket.on("chatMessage", (msg) => {
    console.log(`💬 Message from ${msg.user}: ${msg.text}`);
    socket.broadcast.emit("chatMessage", msg);  // إرسال الرسالة لكل المستخدمين عدا المرسل
  });

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


server.listen(5000, () => {
  console.log("🚀 Server is running on http://localhost:5000");
});
