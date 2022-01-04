/* eslint-disable default-case */
const term = require('terminal-kit').terminal;
const { controllersByEnv } = require('../../../config');
const {
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  updateTaskSelected,
  startTaskSelected,
  finishTaskSelected,
} = require(controllersByEnv);

const menu = async (username) => {
  term.green('\nSelect one option from the menu:\n');

  const items = [
    '1. Create Task', // createTask()
    '2. Update Task', // updateTask()
    '3. Delete Task', // deleteTask()
    '4. See all Tasks', // seeAllTasks()
    '5. See specific Task', // seeSpecificTask()
    '6. Start specific Task', // startTaskSelected()
    '7. Finish specific Task', // finishTask();
    '8. Exit',
  ];

  // Callback
  term.singleColumnMenu(items, (error, response) => {
    term('\n').eraseLineAfter.red(
      '#%s selected: %s \n',
      response.selectedIndex + 1,
      response.selectedText
    );

    (async () => {
      // console.clear(); // ! Genera solapes con el menú de inicio
      switch (response.selectedIndex + 1) {
        case 1:
          await createTask(username);
          break;
        case 2:
          await updateTaskSelected(username);
          break;
        case 3:
          await deleteTask(username);
          break;
        case 4:
          await seeAllTasks(username);
          break;
        case 5:
          await seeSpecificTask(username);
          break;
        case 6:
          await startTaskSelected(username);
          break;
        case 7:
          await finishTaskSelected(username);
          break;
        case 8:
          term.red('Good Bye!');
          process.exit();
      }
      menu(username);
    })();

    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = { menu };
