require('dotenv').config();
// TODO fijate que hay que borrar alguno de estos dos que son innecesarios
const { PORT } = process.env;
const { MONGODB_URI } = process.env;

const mysqlConfig = {
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
};

let dbByEnv;
let controllersByEnv;
let userCheckByEnv;

if (process.env.NODE_ENV === 'mongo') {
  dbByEnv = './database/db-mongo';
  controllersByEnv = '../task/mongo-controllers';
  userCheckByEnv = '../task/mongo-controllers';
} else if (process.env.NODE_ENV === 'mysql') {
  dbByEnv = './database/db-mysql';
  controllersByEnv = '../task/mysql-controllers';
  userCheckByEnv = '../task/mysql-controllers';
} else if (process.env.NODE_ENV === 'json') {
  dbByEnv = './utils/checkDB';
  controllersByEnv = '../task/json-task';
  userCheckByEnv = '../user/userCheck';
}
module.exports = {
  MONGODB_URI,
  PORT,
  mysqlConfig,
  dbByEnv,
  controllersByEnv,
  userCheckByEnv,
};
