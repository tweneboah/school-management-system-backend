import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const DivisionSchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("division", DivisionSchema);
