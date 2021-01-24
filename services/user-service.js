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

exports.add_user = async (req, res) => {
  try {
    const user = new User({
      login: req.body.login,
      displayName: req.body.displayName,
      description: req.body.description,
      online: req.body.online,
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
    if (req.body.displayName) {
      userTemp.login = req.body.displayName;
    }
    if (req.body.description) {
      userTemp.login = req.body.description;
    }
    if (req.body.online) {
      userTemp.login = req.body.online;
    }
    if (req.body.operator) {
      userTemp.login = req.body.operator;
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
