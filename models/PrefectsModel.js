import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const PrefectsSchema =   new Schema( {
    name: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    userID: {
        type: String
    },
    startYear: {
        type: String
    },
    endYear: {
        type: String
    }
}, { timestamps: true })

export default  mongoose.model("prefects", PrefectsSchema);