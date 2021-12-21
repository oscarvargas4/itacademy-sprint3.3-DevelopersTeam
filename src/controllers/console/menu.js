const term = require("terminal-kit").terminal;
const { createTask } = require("../task/createTask");

// Menu: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les tasques o llistar una tasca específica

const menu = async (username) => {
  term.green("Select one option from the menu: \n");
  const items = [
    "1. Create Task", // createTask() --> Alejandro
    "2. Update Task", // updateTask() --> Alejandro
    "3. Delete Task", // deleteTask()
    "4. See all Tasks", // seeAllTasks()
    "5. See specific Task", // seeOneTask()
    "6. Exit",
  ];

  // Callback
  term.singleColumnMenu(items, (error, response) => {
    term("\n").eraseLineAfter.red(
      "#%s selected: %s \n",
      response.selectedIndex + 1,
      response.selectedText
    );

    switch (response.selectedIndex + 1) {
      case 1:
        term.black.bgGreen("Please enter Task description:\n");
        term.inputField((error, input) => {
          createTask(username, input)
            .then(() => {
              process.exit();
            })
            .catch((error) => console.log(error));
        });
        break;
      case 2:
        console.log("Option2");
        break;
      case 3:
        console.log("Option3");
        break;
      case 4:
        console.log("Option4");
        break;
      case 5:
        console.log("Option5");
        break;
      case 6:
        console.log("Option6");
        break;
    }
  });
};

module.exports = { menu };
