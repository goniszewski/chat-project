const socketio = require("socket.io");
const app = require("../app");
const message = require("../models/message");
const io = socketio(app);
const ch = require("./chat-instances");

exports.socket_status = (req, res) => {
  res.json({ status: socketInstance === null ? "connected" : "not connected" });
};

exports.socket_con = async () => {
  io.on("connect", (socket) => {
    socket.on("join", ({ roomId, userId }, callback) => {
      const { error, instance } = ch.addInstance({
        id: socket.id,
        room: roomId,
        user: userId,
      });
      if (error) return callback(error);
      socket.join(roomId);
      io.to(roomId).emit("status", {
        room: roomId,
        logged: ch.getUsersInRoom(roomId),
      });
    });
    socket.on("newMessage", (message, callback) => {
      const instance = ch.getInstance(socket.id);
      io.to(instance.room).emit("message", {
        user: instance.user,
        body: message,
      });
      callback();
    });
    socket.on("disconnect", () => {
      ch.removeInstance(socket.id);
      io.to(socket.room).emit("status", {
        room: socket.room,
        logged: ch.getUsersInRoom(socket.room),
      });
    });
  });
};
