const User = require("../models/user");
const Message = require("../models/message");
const Room = require("../models/room");
const express = require("express");
const app = express();

exports.get_message = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_messages = async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_room_messages = async (req, res) => {
  try {
    const messages = await Message.find({ room: req.param.room });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add_message = async (req, res) => {
  try {
    const message = new message({
      sender: req.body.sender,
      room: req.body.room,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_message = async (req, res) => {
  try {
    let messageTemp = message.findById(req.params.id);

    if (req.body.removed) {
      messageTemp.removed = req.body.removed;
    }
    if (req.body.seen) {
      messageTemp.seen = req.body.seen;
      messageTemp.seenDate = new Date(Date.now()).toISOString();
    }
    messageTemp.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete_message = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    message.remove();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
