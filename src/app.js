const term = require("terminal-kit").terminal; // https://www.npmjs.com/package/terminal-kit
const { checkDB } = require("./utils/checkDB");
const { userCheck } = require("./controllers/user/userCheck");
const { userIdentify } = require("./controllers/console/userIdentify");
const { menu } = require("./controllers/console/menu");



const main = async () => {
  try {
    // Check if Database Exists
    await checkDB();
    // const user = await userIdentify(); --> el objeto con el username definido
    userIdentify();
    // ! Verificar userCheck
    // menu(user); // --> modificar el objeto user y lo actualiza en la base de datos
  } catch (error) {

  }

}

main();


// Username Input
// term.black.bgGreen("Hello User\n");
// term.black.bgGreen("Please enter your username:\n");

// term.inputField((error, input) => {
//   term.red(`\nYour name is: ${input}\n`);
//   userCheck(input).then(() => {
//     process.exit();
//   });
// });




