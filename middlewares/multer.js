import multer from 'multer';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';
//import GridFSStorage  from 'multer-gridfs-storage'

import dotenv from 'dotenv';

dotenv.config();
const connection_url = process.env.DB_CONNECT;

export const UPLOAD_DIRECTORY = './consumerPhotos';

const checkIfDirectoryExists = async () => {
  try {
    await fs.stat(UPLOAD_DIRECTORY);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.mkdir(UPLOAD_DIRECTORY);
    }
  }
};

const storage = multer.diskStorage({
  async destination(req, file, callback) {
    //console.log(file)
    try {
      await checkIfDirectoryExists();
      // console.log(file, "multer file")
      callback(null, UPLOAD_DIRECTORY);
    } catch (err) {
      callback(err);
    }
  },

  async filename(req, file, callback) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${v4()}${fileExtension}`;
    // console.log(fileName, "filename")
    callback(null, fileName);
  },
});

export const uploader = multer({
  storage: storage,
  limits: { fileSize: 2000000 },
});

export const getUploadedFiles = async () => {
  return await fs.readdir(UPLOAD_DIRECTORY);
};

export const findUploadedFile = async fileName => {
  const info = await fs.stat(path.resolve(UPLOAD_DIRECTORY, fileName));
  console.log({ info });
  return info;
};

// const storageFun = new GridFSStorage({
//   ulr: connection_url,
//   file: (req, res) => {
//     return new Promise((resolve, reject) => {
//       crypto.randomBytes(16, (err, buf) => {
//         if(err){
//            return reject(err);
//         }
//         const filename = buf.toString('hex') + path.extname(file.originalname);
//         const fileInfo = {
//           filename: filename,
//           backetName: 'uploads'
//         };
//         resolve(fileInfo);
//       })
//     })
//   }
// })

// export const upload = multer({storageFun})
