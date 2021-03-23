import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const ScholarshipsSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: String
    },
    types: {
        type: Object
    }
}, { timestamps: true })

export default  mongoose.model("scholarships", ScholarshipsSchema);