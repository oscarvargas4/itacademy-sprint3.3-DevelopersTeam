const term = require('terminal-kit').terminal;
const User = require('../../models/mongo-model');

// TODO no permitir crear tareas sin nombre
// TODO el json tiene un error al borrar tareas cuando no queda ninguna

const createUser = async (username) => {
  const usernameLC = username.toLowerCase();
  try {
    const newUser = new User({
      username:
      usernameLC,
    });

    await newUser.save();
  } catch (err) { console.log(err); }
};

const userCheck = async (input) => {
  const inputLC = input.toLowerCase();
  try {
    const foundUser = await User.findOne({
      username: inputLC,
    });
    if (foundUser === true) {
      return true;
    }
    if (foundUser === null) {
      await createUser(inputLC);
    }
  } catch (error) {
    console.log(error);
  }
};

const createTask = async (username) => {
  term.black.bgGreen('Please enter Task description:\n');
  try {
    const input = await term.inputField({}).promise;
    const foundUser = await User.findOne({
      username,
    });
    if (foundUser === null) throw new Error('User not found');

    const newTask = {
      taskName: input,
    };

    foundUser.tasks.push(newTask);
    await foundUser.save();
  } catch (e) {
    console.log(e);
  }
  term.red('\nTask created\n');
};

const seeAllTasks = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;
    if (tasks.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      term.red(`${username} is Tasks: \n`);
      for (let i = 0; i < tasks.length; i++) {
        console.log(`Task #${i + 1}: ${tasks[i].taskName}`);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteTask = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;

    if (tasks.length === 0) {
      term.red('\nNo tasks to delete \n');
    } else {
      const items = [];
      for (let i = 0; i < tasks.length; i++) {
        items[i] = tasks[i].taskName;
      }
      // Hasta aca es readData

      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;
      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText,
      );

      foundUser.tasks.splice(response.selectedIndex, 1);
      term.red('\nTask deleted successfully \n');
      await foundUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;

    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].taskName;
    }

    term.black.bgGreen('\nSelect a Task:\n');
    const response = await term.singleColumnMenu(items).promise;
    term.bold(`\nID: ${tasks[response.selectedIndex].id} \n`);
    term.bold(`Description : ${tasks[response.selectedIndex].taskName} \n`);
    term.bold(`Status : ${tasks[response.selectedIndex].status} \n`);
    term.bold(`Created : ${tasks[response.selectedIndex].createdAt} \n`);
    term.bold(`Updated : ${tasks[response.selectedIndex].updatedAt} \n`);
    if (tasks[response.selectedIndex].finishedAt) {
      term.bold(`Finished : ${tasks[response.selectedIndex].finishedAt} \n`);
    }
  } catch (error) {
    console.log(error);
  }
};

const finishTaskSelected = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;

    if (tasks.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      const items = [];
      for (let i = 0; i < tasks.length; i++) {
        items[i] = tasks[i].taskName;
      }

      term.black.bgGreen('\nWhich Task would you like to finish?:\n');
      const response = await term.singleColumnMenu(items).promise;
      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText,
      );

      foundUser.tasks[response.selectedIndex].status = 'finished';
      foundUser.tasks[response.selectedIndex].finishedAt = Date.now();
      term.red('\nTask finished successfully\n');
      await foundUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTaskSelected = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;
    if (tasks.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      const items = [];
      for (let i = 0; i < tasks.length; i++) {
        items[i] = tasks[i].taskName;
      }

      const response = await term.singleColumnMenu(items).promise;
      term.black.bgGreen('Please enter new Task description:\n');
      const input = await term.inputField().promise;

      foundUser.tasks[response.selectedIndex].taskName = input;
      term.red(`\nTask updated to: "${input}" \n`);
      await foundUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const startTaskSelected = async (username) => {
  try {
    const foundUser = await User.findOne({
      username,
    });

    const { tasks } = foundUser;

    if (tasks.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      const items = [];
      for (let i = 0; i < tasks.length; i++) {
        items[i] = tasks[i].taskName;
      }

      term.black.bgGreen('\nWhich Task would you like to finish?:\n');
      const response = await term.singleColumnMenu(items).promise;
      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText,
      );

      foundUser.tasks[response.selectedIndex].status = 'started';
      foundUser.tasks[response.selectedIndex].updatedAt = Date.now();
      term.red('\nTask finished successfully\n');
      await foundUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {

  createUser,
  userCheck,
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  finishTaskSelected,
  updateTaskSelected,
  startTaskSelected,
};
