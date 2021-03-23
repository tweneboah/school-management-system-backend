import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const PaymentSchema =   new Schema( {
    name: {
        type: String,
    },
    plans: {
        type:[
           {
             name: String,
             plan: String,
             description: String,
             price: String
           }
        ]
    },
    services: {
        type: [
           {
               name: String,
               plan1: String,
               plan2: String,
               plan3: String,
           }
        ]
    },
    dataID: {
        type: String,
        default: "paymentPlan"
    },
}, { timestamps: true })

export default  mongoose.model("data", PaymentSchema);