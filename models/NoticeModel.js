import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const NotificationsSchema =   new Schema( {
   date: {
       type: Date,
       default: Date.now
   },
   title: {
       type: String
   },
   description: {
       type: String
   },
   createdBy: {
       type: String,
   },
   receiver: {
       type: [],
       default: "All"
   }

}, { timestamps: true })

export default  mongoose.model("notices", NotificationsSchema);