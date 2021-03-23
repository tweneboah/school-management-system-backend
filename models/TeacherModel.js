import mongoose from "../config/mongodb.js";

const { Schema } = mongoose;

const TeacherSchema = new Schema(
  {
    userID: String,
    name: {
      type: String,
      required: true,
    },
    resetPassowrdToken: String,
    resetPasswordExpires: Date,
    surname: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    withdraw: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
    },
    email: {
      type: String,
    },
    physicalAddress: {
      type: String,
    },
    postalAddress: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
    },
    dateofBirth: {
      type: String,
    },
    placeofBirth: {
      type: String,
    },
    department: {
      type: String,
    },
    role: {
      type: String,
      default: "teacher",
    },
    qualifiations: {
      type: String,
    },
    bank: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    position: {
      type: String,
    },
    telephone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    nextofKin: {
      type: {
        relationship: String,
        occupation: String,
        name: String,
        email: String,
        mobile: String,
        address: String,
        lastname: String,
      },
    },
    profileUrl: {
      type: String,
    },
    salary: {
      type: String,
    },
    allowance: {
      type: String,
    },
    ssnit: {
      type: String,
    },
    taxNumber: {
      type: String,
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
    nationality: {
      type: String,
    },
    religion: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("teachers", TeacherSchema, "accounts");
