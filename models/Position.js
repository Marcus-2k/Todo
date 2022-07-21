const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const positionSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  condition: {
    type: Boolean,
    required: true,
  },
  update: {
    type: Boolean,
    required: true,
  },
  category: {
    type: Number,
    required: true,
  },
  user: {
    ref: "users",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("positions", positionSchema);
