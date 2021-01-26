const server = require("../app");
const message = require("../models/message");
const ch = require("./chat-instances");
const sms = require("./socket-message-service.js");

exports.socket_con = (io) => {
  io.on("connection", (socket) => {
    socket.on("join", ({ roomId, userId }, callback) => {
      const { error, instance } = ch.addInstance({
        id: socket.id,
        roomId: roomId,
        userId: userId,
      });

      console.log(
        "user: ",
        userId,
        " joined: ",
        roomId,
        "\ninstance: ",
        instance
      );

      if (error) return callback(error);
      socket.join(roomId);
      io.to(roomId).emit("status", {
        room: roomId,
        logged: ch.getUsersInRoom(roomId),
      });
      const prevMessages = sms
        .get_room_messages(roomId)
        .then((res) => res)
        .then((r) => {
          io.to(instance.room).emit("prevMessages", r);
        });
    });
    socket.on("newMessage", (message, callback) => {
      const instance = ch.getInstance(socket.id);
      console.log("instance", instance);
      io.to(instance.room).emit("message", {
        room: message.room,
        user: message.user,
        body: message.body,
        time: message.time,
      });
      sms.add_message({
        userId: message.user,
        roomId: message.room,
        body: message.body,
      });
      // callback();
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
