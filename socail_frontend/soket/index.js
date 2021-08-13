const io = require("socket.io")(9099, {
  cors: {
    origin: "http://localhost:3000",
  },
});
io.on("connection", (socket) => {
  console.log("a suer is connected");
});
