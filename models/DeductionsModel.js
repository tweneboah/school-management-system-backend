import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const DeductionsSchema = new Schema(
  {
    name: {
      type: String,
    },
    amount: {
      type: String,
    },
    staff: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("deductions", DeductionsSchema);
