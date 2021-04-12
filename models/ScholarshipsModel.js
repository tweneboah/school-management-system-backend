const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const ScholarshipsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    percentage: {
      type: String,
    },
    types: {
      type: Object,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("scholarships", ScholarshipsSchema);
