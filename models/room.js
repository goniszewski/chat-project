const mongoose = require("mongoose");
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
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
  },
  { toJSON: { virtuals: true } }
);

roomSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "room",
  justOne: false,
  options: { sort: { added: -1 } },
});

module.exports = mongoose.model("Room", roomSchema);
