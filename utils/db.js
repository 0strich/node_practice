const Promise = require('promise');
const mongoose = require('mongoose');
const config = require('../config/dbconfig');
const cwr = require('./createWebResp');
require('dotenv').config();

let DB_NAME;
let DB_USER;
let DB_PASSWORD;
let MONGO_DB_URL;
console.log('process.env.NODE_ENV in DB => ', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  DB_NAME = config.prodDB.db_name;
  DB_USER = config.prodDB.mongodb_user;
  DB_PASSWORD = config.prodDB.mongodb_password;
  MONGO_DB_URL = config.prodDB.mongodb_url;
} else {
  DB_NAME = config.devDB.db_name;
  DB_USER = config.devDB.mongodb_user;
  DB_PASSWORD = config.devDB.mongodb_password;
  MONGO_DB_URL = config.devDB.mongodb_url;
}

mongoose.Promise = global.Promise;

const connect = (DB_URI) =>
  new Promise((resolve, reject) => {
    if (mongoose.connection.readyState) {
      // console.log("mongoose.connection.readyState");
      resolve(mongoose.connection);
    } else {
      console.log('connect else');
      mongoose
        .connect(DB_URI, {
          // user: DB_USER,
          // pass: DB_PASSWORD,
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true,
          socketTimeoutMS: 5 * 60 * 1000, // socket timeout 5 minutes
        })
        .then((connection) => {
          resolve(connection);
        })
        .catch((err) => {
          console.log('connection error : ', err);
          reject(err);
        });
    }
  });

exports.connectDB = async () => {
  const DB_URI = `mongodb://${MONGO_DB_URL}/${DB_NAME}`;
  console.log('DB URI : ', DB_URI);
  console.log('passpasspass')
  try {
    await connect(DB_URI);
  } catch (error) {
    console.log('E0000 - DB 연결 오류 : ', error);
  }
};

// middleWare 사용
exports.tryConDB = async (req, res, next) => {
  await this.connectDB().catch((error) => {
    cwr.errorWebResp(res, 500, 'E0000 - DB 연결 오류', error);
  });
  next();
};

exports.close = () => {
  mongoose.connection.close();
};
