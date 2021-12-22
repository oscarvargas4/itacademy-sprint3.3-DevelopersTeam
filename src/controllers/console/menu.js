const term = require("terminal-kit").terminal;
const { createTask } = require("../task/createTask");
const { updateTaskSelected } = require("../task/updateTask");
const { seeAllTasks } = require("../task/seeAllTasks");
const { seeSpecificTask } = require("../task/seeSpecificTask");
const { deleteTask } = require("../task/deleteTask");

// Menu: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les tasques o llistar una tasca específica

const menu = async (username) => {
  term.green("Select one option from the menu: \n");
  const items = [
    "1. Create Task", // createTask()
    "2. Update Task", // updateTask()
    "3. Delete Task", // deleteTask()
    "4. See all Tasks", // seeAllTasks()
    "5. See specific Task", // seeSpecificTask()
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
        createTask(username);
        break;
      case 2:        
        updateTaskSelected(username);        
        break;
      case 3:
        deleteTask(username);
        break;
      case 4:
        seeAllTasks(username)      
        break;
      case 5:
        seeSpecificTask(username);
        break;
      case 6:
        term.red("Good Bye!");
        process.exit();
    }

    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = { menu };
