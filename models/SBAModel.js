const mongoose = require("../config/mongodb");

const { Schema } = mongoose;

const SBASchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    term: {
      type: String,
    },
    exam: {
      type: Number,
    },
    classWork: {
      type: Number,
    },
    students: {
      type: [
        {
          userID: String,
          name: String,
          position: String,
          exam: Number,
          classWork: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("sba", SBASchema);
