import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const CourserSchema = new Schema(
  {
    date: {
      type: Date,
      default: Date.now,
    },
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    classID: {
      type: String,
    },
    classes: {
      type: Array,
    },
    department: {
      type: String,
    },
    type: {
      type: String,
    },
    teacher: {
      type: String,
    },
    default: [],
  },
  { timestamps: true }
);

export default mongoose.model("courses", CourserSchema);
