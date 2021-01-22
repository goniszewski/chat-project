import mongoose from "mongoose";
const { Schema } = mongoose;

const messageSchema = new Schema({
  content: String,
  sender: {
    type: Schema.ObjectId,
    ref: "User",
  },
  room: {
    type: Schema.ObjectId,
    ref: "Room",
  },
  added: { type: Date, default: Date.now },
  removed: Boolean,
  seen: Boolean,
  seenDate: Date,
});

module.exports = mongoose.model("Message", messageSchema);
