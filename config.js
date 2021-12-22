require('dotenv').config();

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

const mysqlConfig = {
  port: process.env.MYSQL_PORT,
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
};

// TODO Borrar o implementar: para elegir la base de datos con variables de entorno. Esto es codigo copiado de otro lado, asi que si lo leen y no encuentran sentido, esta bien, pero es la forma mas o menos
let dbByEnv;
let controllersByEnv;

if (process.env.NODE_ENV === 'mongo') {
  dbByEnv = './database/db-mongo';
  controllersByEnv = '../task/mongo-controllers';
} else if (process.env.NODE_ENV === 'mysql') {
  dbByEnv = './database/db-mysql';
  controllersByEnv = '../task/mysql-controllers';
} else if (process.env.NODE_ENV === 'json') {
  dbByEnv = './utils/checkDB';
  controllersByEnv = '../task/json-task';
}
module.exports = {
  MONGODB_URI,
  PORT,
  mysqlConfig,
  dbByEnv,
  controllersByEnv,
};
