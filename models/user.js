const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    login: String,
    displayName: String,
    description: String,
    online: Boolean,
    added: { type: Date, default: Date.now },
    password: String,
    lastSeen: Date,
    operator: Boolean,
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

module.exports = mongoose.model("User", userSchema);
