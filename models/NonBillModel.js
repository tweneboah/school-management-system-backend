import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const NonBillSchema = new Schema(
  {
    student: {
      type: String,
    },
    term: {
      type: String,
    },
    year: {
      type: String,
    },
    amount: {
      type: String,
    },
    remarks: {
      type: String,
    },
    paymentType: {
      type: String,
    },
    bank: {
      type: String,
    },
    cheque: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("nonbillpayment", NonBillSchema);
