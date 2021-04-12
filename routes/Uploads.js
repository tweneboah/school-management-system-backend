const { uploader } = require("../middlewares/multer");
const express = require("express");
//import StudentModel from '../models/SchoolModel.js'
const route = express.Router();

//upload
route.post("/", uploader.single("photo"), (req, res, next) => {
  try {
    console.log("logging req.file: ", req.file);
    res.send({ path: `${req.file.filename}` });
    // res.status(200).sendFile(`${__dirname}/public/consumerPhotos/${req.file.filename}`);
  } catch (err) {
    res.status(418).send(err);
  }
});

module.exports = route;
