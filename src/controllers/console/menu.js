/* eslint-disable default-case */
const term = require('terminal-kit').terminal;
const { controllersByEnv } = require('../../../config');

const {
  createTask, deleteTask, seeAllTasks, seeSpecificTask, updateTaskSelected,
} = require(controllersByEnv);

const menu = async (username) => {
  term.green('Select one option from the menu: \n');
  const items = [
    '1. Create Task', // createTask()
    '2. Update Task', // updateTask()
    '3. Delete Task', // deleteTask()
    '4. See all Tasks', // seeAllTasks()
    '5. See specific Task', // seeSpecificTask()
    '6. Exit',
  ];

  // Callback
  term.singleColumnMenu(items, (error, response) => {
    term('\n').eraseLineAfter.red(
      '#%s selected: %s \n',
      response.selectedIndex + 1,
      response.selectedText,
    );
    async function switchFun() {
      switch (response.selectedIndex + 1) {
        case 1:
          await createTask(username);
          menu(username);
          break;
        case 2:
          updateTaskSelected(username);
          break;
        case 3:
          await deleteTask(username);
          menu(username);
          break;
        case 4:
          await seeAllTasks(username);
          menu(username);
          break;
        case 5:
          seeSpecificTask(username);
          break;
        case 6:
          term.red('Good Bye!');
          process.exit();
      }
    }
    switchFun();
    if (error) {
      throw new Error(error);
    }
  });
};

module.exports = { menu };
