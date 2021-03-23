import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const StudentSchema = new Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    resetPassowrdToken: String,
    resetPasswordExpires: Date,
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    dateofBirth: {
      type: Date,
    },
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    placeOfBirth: {
      type: String,
    },
    email: {
      type: String,
    },
    position: String,
    middleName: {
      type: String,
    },
    physicalAddress: {
      type: String,
    },
    postalAddress: {
      type: String,
    },
    dormitoryID: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "student",
    },
    status: {
      type: String,
      //border or day scholar
    },
    fees: {
      type: String,
    },
    scholarship: {
      type: String,
    },
    telephone: {
      type: String,
    },
    mobilenumber: {
      type: String,
    },
    classID: {
      type: String,
    },
    courses: {
      type: [
        {
          courseID: String,
        },
      ],
    },
    guadian: {
      type: [
        {
          id: String,
          relationship: String,
          occupation: String,
          name: String,
          email: String,
          mobile: String,
          address: String,
          lastname: String,
        },
      ],
    },
    campusID: {
      type: String,
    },
    profileUrl: {
      type: String,
    },
    grade: {
      type: String,
    },
    lastSchool: {
      type: {
        school: String,
        reason: String,
      },
    },
    password: {
      type: String,
      required: true,
    },
    health: {
      type: String,
    },
    allege: {
      type: String,
    },
    disease: {
      type: String,
    },
    section: {
      type: String,
    },
    division: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    past: {
      type: {
        status: true,
        date: Date,
      },
    },
    withdraw: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("students", StudentSchema, "accounts");