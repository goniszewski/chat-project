import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema({
  name: String,
  displayName: String,
  operator: {
    type: Schema.ObjectId,
    ref: "User",
  },
  user: {
    type: Schema.ObjectId,
    ref: "User",
  },
  description: String,
  added: { type: Date, default: Date.now },
  private: Boolean,
});

module.exports = mongoose.model("Room", roomSchema);
