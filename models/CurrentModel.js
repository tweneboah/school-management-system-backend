import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const AcademicYearSchema =   new Schema( {
    currentYear: {
        type: String,
    },
    years: {
        type: Array
    },
    terms: {
        type: Array
    },
    code: {
        type: String
    },
    currentTerm: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

export default  mongoose.model("academicYear", AcademicYearSchema);