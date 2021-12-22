const term = require("terminal-kit").terminal; // https://www.npmjs.com/package/terminal-kit
const { checkDB } = require("./utils/checkDB");
const { userIdentify } = require("./controllers/console/userIdentify");


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

