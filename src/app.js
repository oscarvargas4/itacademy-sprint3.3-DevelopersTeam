const { dbByEnv } = require('../config');

console.log('dbByEnv', dbByEnv); // TODO borrar

const { checkDB } = require(dbByEnv);
const { userIdentify } = require('./controllers/console/userIdentify');

// main function
(async () => {
  try {
    // Check if Database Exists
    await checkDB();
    // Check if User Exists, if not, create a new one
    userIdentify();
  } catch (error) {
    console.log(error);
  }
})();
