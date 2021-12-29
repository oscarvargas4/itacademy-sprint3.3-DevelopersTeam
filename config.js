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
  [dbByEnv, controllersByEnv] = ['./database/db-mongo', '../task/mongo-controllers'];
} else if (process.env.NODE_ENV === 'mysql') {
  [dbByEnv, controllersByEnv] = ['./database/db-mysql', '../task/mysql-controllers'];
} else if (process.env.NODE_ENV === 'json') {
  [dbByEnv, controllersByEnv] = ['./database/db-json', '../task/json-controllers'];
}

module.exports = {
  MONGODB_URI,
  PORT,
  mysqlConfig,
  dbByEnv,
  controllersByEnv,
  userCheckByEnv,
};
