import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const YearGroupSchema = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
    year: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("yeargroup", YearGroupSchema);
