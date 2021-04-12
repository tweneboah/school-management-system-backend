const mongoose = require('mongoose');
const dotenv = require('dotenv');

//LOCAL_DB_CONNECT  -localhost database
//DB_CONNECT  -online database
dotenv.config();
const connection_url = process.env.LOCAL_DB_CONNECT;

mongoose.connect(
  'mongodb+srv://sms:RVy6PD1V2ljiOCJS@school-management-syste.zeq56.mongodb.net/school-management-sys?retryWrites=true&w=majority',
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

//export default mongoose;
module.exports = mongoose;
