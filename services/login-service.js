const User = require("../models/user");
const express = require("express");
const app = express();

exports.log_user = async (req, res) => {
  try {
    let user = await User.findOne({
      login: req.body.login,
      password: req.body.password,
    });
    if (!user) {
      res.json({ error: "'login' and/or 'password' were incorrect." });
    } else {
      user.lastSeen = new Date(Date.now()).toISOString();
      user.save();
      let response = {
        id: user.id,
        login: user.login,
        operator: user.operator,
        description: user.description,
      };
      if (!user.operator) {
        response.room = user.room;
      }

      res.json(response);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
