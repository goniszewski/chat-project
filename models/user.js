const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    login: String,
    description: String,
    added: { type: Date, default: Date.now },
    password: String,
    lastSeen: Date,
    operator: Boolean,
    room: {
      type: Schema.ObjectId,
      ref: "Room",
    },
  },
  { toJSON: { virtuals: true } }
);

userSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "sender",
  justOne: false,
  options: { sort: { added: -1 } },
});

userSchema.virtual("rooms", {
  ref: "Room",
  localField: "_id",
  foreignField: "operator",
  justOne: false,
  options: { sort: { added: -1 } },
});

module.exports = mongoose.model("User", userSchema);
