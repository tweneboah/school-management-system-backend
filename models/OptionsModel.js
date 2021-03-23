import  mongoose from "../config/mongodb.js"

const { Schema } = mongoose;

const OptionsModel =   new Schema( {
    events: {
      type: [
            {
                type: String
            }
         ]
    },
    date: {
        type: Date, 
        default: Date.now
     },
}, { timestamps: true })

export default  mongoose.model("optionsdata", OptionsModel);