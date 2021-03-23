import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const TaskSchema =   new Schema( {
   teacherID: String,
   courseID: String,
   classID: String,
   score: String,
   taskData: String,
   date: {
       type: Date,
       default: Date.now
   },
   deadline: {
       type: Date
   }

}, { timestamps: true })

export default  mongoose.model("tasks", TaskSchema);