const term = require("terminal-kit").terminal;

// Menu: crear tasca, actualitzar tasca, esborrar tasca, llistar totes les tasques o llistar una tasca específica

const menu = async () => {
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

    console.log(response);

    process.exit();
  });
};


module.exports = { menu };
