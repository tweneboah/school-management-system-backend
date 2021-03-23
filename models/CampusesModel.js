import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const CampusSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

export default  mongoose.model("campus", CampusSchema);