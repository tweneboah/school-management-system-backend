import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const StoreitemsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    unit: {
      type: String,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("storeitems", StoreitemsSchema);
