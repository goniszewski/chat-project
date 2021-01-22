import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  login: String,
  displayName: String,
  description: String,
  online: Boolean,
  status: String,
  added: { type: Date, default: Date.now },
  password: String,
  lastSeen: Date,
  operator: Boolean,
});

module.exports = mongoose.model("User", userSchema);
