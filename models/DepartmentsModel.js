import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const DepartmentSchema =   new Schema( {
  name: {
     type: String
  },
  description: {
    type: String
  }
}, { timestamps: true })

export default  mongoose.model("departments", DepartmentSchema);