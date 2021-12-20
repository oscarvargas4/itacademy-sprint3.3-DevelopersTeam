const term = require("terminal-kit").terminal; // https://www.npmjs.com/package/terminal-kit
const { checkDB } = require("./database/checkDB");
const { userCheck } = require("./utils/userCheck");

// Check if Database Exists
checkDB()

// Username Input
// term.black.bgGreen("Hello User\n");
// term.black.bgGreen("Please enter your username:\n");

// term.inputField((error, input) => {
//   term.red(`\nYour name is: ${input}\n`);
//   userCheck(input).then(() => {
//     process.exit();
//   });
// });

// // Menu: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les tasques o llistar una tasca específica

// term.green("Select one option from the menu: \n");
// const items = [
//   "1. Create Task", // createTask() --> Alejandro
//   "2. Update Task", // updateTask() --> Alejandro
//   "3. Delete Task", // deleteTask()
//   "4. See all Tasks", // seeAllTasks()
//   "5. See specific Task", // seeOneTask()
//   "6. Exit"
// ];

// term.singleColumnMenu(items, (error, response) => {
//   term("\n").eraseLineAfter.red(
//     "#%s selected: %s (%s, %s) \n",
//     response.selectedIndex,
//     response.selectedText,
//     response.x,
//     response.y
//   );

//   console.log(response);

//   process.exit();
// });
