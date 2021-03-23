import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const StoreSalesSchema = new Schema(
  {
    name: {
      type: String,
    },
    totalCost: {
      type: Number,
    },
    amountPaid: {
      type: Number,
    },
    seller: {
      type: String,
    },
    items: {
      type: [
        {
          name: {
            type: String,
          },
          qty: {
            type: Number,
          },
          rate: {
            type: Number,
          },
          amount: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("storesales", StoreSalesSchema);
