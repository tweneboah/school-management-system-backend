import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const NextofKinchema =   new Schema( {
   name: {
       type: String,
   },
   surname: {
       type: String
   },
   address: {
       type: String
   },
   telephone: {
       type: String
   },
   occupation: {
       type: String,
   },
   relationship: {
       String
   },
   gender: {
       type: String
   },
   email: {
       type: String
   }
}, { timestamps: true })

export default  mongoose.model("nextofkins", NextofKinchema);