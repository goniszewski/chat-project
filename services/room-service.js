const User = require("../models/user");
const Message = require("../models/message");
const Room = require("../models/room");
const express = require("express");
const app = express();

exports.get_room = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_rooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add_room = async (req, res) => {
  try {
    const room = new Room({
      name: req.body.name,
      displayName: req.body.displayName,
      operator: req.body.operator,
      user: req.body.user,
      description: req.body.description,
      private: req.body.private,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.set_operator = async (req, res) => {
  try {
    let roomTemp = Room.findById(req.params.id);

    if (req.body.id) {
      roomTemp.operator = req.body.id;
    }
    roomTemp.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.set_user = async (req, res) => {
  try {
    let roomTemp = Room.findById(req.params.id);

    if (req.body.id) {
      roomTemp.user = req.body.id;
    }
    roomTemp.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_room = async (req, res) => {
  try {
    let roomTemp = Room.findById(req.params.id);

    if (req.body.displayName) {
      roomTemp.displayName = req.body.displayName;
    }
    if (req.body.description) {
      roomTemp.operator = req.body.operator;
    }
    if (req.body.user) {
      roomTemp.login = req.body.user;
    }
    if (req.body.online) {
      roomTemp.description = req.body.description;
    }
    if (req.body.operator) {
      roomTemp.private = req.body.private;
    }
    roomTemp.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete_room = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    room.remove();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
