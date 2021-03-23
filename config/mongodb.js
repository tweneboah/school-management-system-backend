import mongoose from 'mongoose';
import dotenv from 'dotenv';

//LOCAL_DB_CONNECT  -localhost database
//DB_CONNECT  -online database
dotenv.config();
const connection_url = process.env.DB_CONNECT;

mongoose.connect(
  'mongodb+srv://inovotek:MYJmX4htfWqV1l37@cluster0.4ttt9.mongodb.net/demo-db?retryWrites=true&w=majority',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);

mongoose.connection.once('open', () => {
  console.log('db connnected localhost db');
  // gfs = new mongoose.mongo.GridFSBucket(connect.db, {
  //     bucketName: "uploads"
  // })
});

export default mongoose;
