const term = require("terminal-kit").terminal;
const { userCheck } = require("../user/userCheck");
const { menu } = require("./menu");

const userIdentify = async () => {
  term.black.bgGreen("Hello User\n");
  term.black.bgGreen("Please enter your username:\n");

  term.inputField((error, input) => {
    term.red(`\nYour name is: ${input}\n`);
    userCheck(input).then(() => {
      menu(input.toLocaleLowerCase());
    });
    if (error) {
      throw new Error(error);
    }
  });
  
};



module.exports = { userIdentify };
