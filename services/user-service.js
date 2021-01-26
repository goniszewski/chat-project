const User = require("../models/user");
const Message = require("../models/message");
const Room = require("../models/room");
const express = require("express");
const app = express();

exports.get_user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_users = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_user_messages = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: "messages",
      match: { sender: req.params.id },
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.get_operator_rooms = async (req, res) => {
  try {
    const rooms = await Room.find({ operator: req.params.id });
    if (rooms[0]) {
      res.json(rooms);
    } else {
      res.json({ error: "User is not a operator." });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.add_user = async (req, res) => {
  try {
    const user = new User({
      login: req.body.login,
      description: req.body.description,
      password: req.body.password,
      operator: false,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update_user = async (req, res) => {
  try {
    let userTemp = User.findById(req.params.id);

    if (req.body.login) {
      userTemp.login = req.body.login;
    }
    if (req.body.password) {
      userTemp.password = req.body.password;
    }
    if (req.body.description) {
      userTemp.description = req.body.description;
    }
    if (req.body.operator) {
      userTemp.operator = req.body.operator;
    }
    if (req.body.lastSeen) {
      userTemp.lastSeen = req.body.lastSeen;
    }
    if (req.body.room && !userTemp.room) {
      userTemp.room = req.body.room;
    }
    userTemp.save();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete_user = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.remove();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
