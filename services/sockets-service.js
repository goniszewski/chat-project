const server = require("../app");
const message = require("../models/message");

const ch = require("./chat-instances");

exports.socket_con = (io) => {
  console.log("hi");
  io.on("connection", (socket) => {
    socket.on("join", ({ roomId, userId }, callback) => {
      const { error, instance } = ch.addInstance({
        id: socket.id,
        room: roomId,
        user: userId,
      });
      console.log("user ", userId, " joined ", roomId);
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
        room: message.room,
        user: message.user,
        body: message.body,
        time: message.time,
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
