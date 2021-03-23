import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const UsersSchema = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    type: {
      type: String,
    },
    lastlogin: {
      type: Date,
    },
    restrictions: {
      type: Object,
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", UsersSchema);
