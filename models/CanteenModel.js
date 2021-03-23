import  mongoose from "../config/mongodb.js"
const { Schema } = mongoose;

const CanteenSchema = new Schema( {
    name: {
        type: String,
        required: true
    },
    classID: {
        type: String
    },
    memberID: {
        type: String
    },
    userID: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    paymentMethod: {
        type: String
    },
    payments: {
        type: [
            {
                date: {
                    type: Date,
                    default: Date.now
                },
                receipt: String,
                amount: String,
                covers: {
                    period: String
                }
            }
        ]
    },
    date: {
        type: Date,
        default: Date.now
    } 
}, { timestamps: true })

export default  mongoose.model("canteen", CanteenSchema);