import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const DormitoriesSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    campus: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

export default  mongoose.model("dormitories", DormitoriesSchema);