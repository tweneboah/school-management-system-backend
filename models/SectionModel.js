import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const SectionSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
}, { timestamps: true })

export default  mongoose.model("sections", SectionSchema);