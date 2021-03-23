import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const BankingSchema = new Schema(
  {
    useID: {
      type: String,
      required: true,
    },
    basicSalary: {
      type: String,
    },
    bank: {
      type: String,
    },
    employeeSSF: {
      type: String,
    },
    transactions: {
      type: [
        {
          date: {
            type: Date,
            default: Date.now,
          },
          allowance: String,
          grossIncome: String,
          deductions: String,
          tax: String,
          netSalary: String,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("staffpay", BankingSchema);
