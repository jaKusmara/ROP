const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
  },
});

io.use((socket, next) => {
  const user_id = socket.handshake.auth.user_id;

  if (!user_id) {
    return next(new Error("invalid user_id"));
  }

  socket.user_id = user_id;
  next();
});

io.on("connection", (socket) => {
  let room_id = "";

  socket.on("join", (room) => {
    socket.join(room);
    room_id = room
    console.log(`User joined room: ${room}`);
  });

  const users = [];
  for (let [socket] of io.of("/").sockets) {
    users.push({
      user_id: socket.user_id,
    });
  }

  io.emit("users", users);

  socket.on("private_message", (data) => {
    const { to, content } = data;
    console.log(content)
    io.to(to).to(room_id).emit("private_message", {
      content,
      sender_id: socket.user_id,
      to
    });
  });
});

httpServer.listen(3500, () => {
  console.log("Socket.io in port 3500");
});

module.exports = { io };
