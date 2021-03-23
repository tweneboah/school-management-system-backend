import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const ClassesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacherID: {
      type: String,
    },
    classCode: {
      type: String,
      required: true,
    },
    campusID: {
      type: String,
    },
    division: {
      type: String,
    },
    academic: {
      type: String,
    },
    group: {
      type: String,
    },
    prefect: {
      type: String,
    },
    sba: {
      type: Boolean,
    },
    sbaStaff: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("classes", ClassesSchema);
