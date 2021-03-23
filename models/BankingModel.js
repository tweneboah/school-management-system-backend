import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const BankingSchema =   new Schema( {
    bankName: {
        type: String,
        required: true
    },
    accountNumber: {
        type: String
    },
    accountName: {
        type: String
    },
    transactions: {
        type: [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                description: String,
                payee: String,
                transactionNumber: String,
                credit: String,
                debit: String,
                bankAcc: String,
                issuedDate: {
                    type: Date
                }
            }
        ]
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

export default  mongoose.model("banking", BankingSchema);