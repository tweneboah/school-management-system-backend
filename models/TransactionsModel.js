import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TransactionSchema = new Schema(
  {
    amount: {
      type: String,
      required: true,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    chequeNumber: {
      type: String,
    },
    bank: {
      type: String,
    },
    description: String,
    pay: {
      type: {
        accountNumber: String,
        bank: String,
        userID: String,
        position: String,
        month: String,
      },
    },
    fees: {
      type: {
        userID: String,
        term: String,
        academicYear: String,
        applyTo: {
          all: Boolean,
          tuition: Boolean,
          examination: Boolean,
        },
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("transactions", TransactionSchema);
