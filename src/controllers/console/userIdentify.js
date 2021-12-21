const term = require("terminal-kit").terminal;
const { userCheck } = require("../user/userCheck");

const userIdentify = async () => {
  term.black.bgGreen("Hello User\n");
  term.black.bgGreen("Please enter your username:\n");

  term.inputField((error, input) => {
    term.red(`\nYour name is: ${input}\n`);
    userCheck(input).then(() => {
      process.exit();
      // ! Intentar ejecutar el menu aqui --> Antes del process.exit()
    });
  });

  // return new Promise((resolve, reject) => {
  //   term.black.bgGreen("Hello User\n");
  //   term.black.bgGreen("Please enter your username:\n");
  
  //   term.inputField((error, input) => {
  //     term.red(`\nYour name is: ${input}\n`);
  //     userCheck(input).then(() => {
  //       resolve(input);
  //       process.exit();
  //     }).catch(err => { reject(err)});
  //   });
  
  // });
};



module.exports = { userIdentify };
