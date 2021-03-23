import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const FilesSchema =   new Schema( {
   topic: {
       type: String
   },
   date: {
       type: Date,
       default: Date.now
   },
   notes: {
       type: String
   },
   courseID: {
       type: String
   },
   classID: {
       type: String
   },
   senderID: {
       type: String
   },
   file: {
       type: String
   }
}, { timestamps: true })

export default  mongoose.model("notes", FilesSchema);