import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const SBASchema = new Schema(
  {
    class: {
      type: String,
      required: true,
    },
    course: {
      type: String,
    },
    academicYear: {
      type: String,
    },
    term: {
      type: String,
    },
    students: {
      type: [
        {
          userID: String,
          name: String,
          position: String,
          exam: Number,
          classWork: Object,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("sba", SBASchema);
