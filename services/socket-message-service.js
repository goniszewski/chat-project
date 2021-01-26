const Message = require("../models/message");

exports.get_message = async (id) => {
  try {
    const message = await Message.findById(id);
    return message;
  } catch (err) {
    console.log(err);
  }
};

exports.get_room_messages = async (roomId) => {
  try {
    const messages = await Message.find({ room: roomId });
    console.log("messages", messages);
    return messages;
  } catch (err) {
    console.log(err);
  }
};

exports.add_message = async (data) => {
  try {
    console.log("message added to DB:", data);
    const message = new Message({
      sender: data.userId,
      room: data.roomId,
      content: data.body,
    });
    message.save();
  } catch (err) {
    console.log(err);
  }
};

exports.delete_message = async (id) => {
  try {
    const message = await Message.findById(id);
    message.remove();
  } catch (err) {
    console.log(err);
  }
};
