import {uploader} from '../middlewares/multer.js'
import express from "express";
//import StudentModel from '../models/SchoolModel.js'
const route = express.Router();

//https://www.freecodecamp.org/news/gridfs-making-file-uploading-to-mongodb/

//upload
route.post("/", uploader.single("photo"), (req, res, next) => {
  try {
    console.log("logging req.file: ", req.file);
    res.send({path: `${req.file.filename}`});
   // res.status(200).sendFile(`${__dirname}/public/consumerPhotos/${req.file.filename}`);
  } 
  catch (err) {
    res.status(418).send(err);
  }
});



export default route;