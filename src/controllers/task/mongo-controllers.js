const term = require('terminal-kit').terminal;
const User = require('../../models/mongo-model');

const createUser = async (username) => {
  const usernameLC = username.toLowerCase();
  try {
    console.log('entra al create user con username como:', username);
    const newUser = new User({
      username:
      usernameLC,
    });

    console.log('newUser created:::', newUser);
    await newUser.save();
  } catch (err) { console.log(err); }
};

const userCheck = async (input) => { // ! Borrar console.log
  console.log('entra a userCheck');
  const inputLC = input.toLowerCase();
  try {
    console.log('input: ', input);
    const foundUser = await User.findOne({
      username: inputLC,
    });
    console.log('found user:,', foundUser);
    if (foundUser === true) {
      console.log('entra al true');
      return true;
    }
    if (foundUser === null) {
      console.log('entra al false');
      await createUser(inputLC);
    }
  } catch (error) {
    console.log(error);
  }
};

// TODO este metodo es el mismo para todas las DB

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
    term.red(`${username} is Tasks: \n`);
    for (let i = 0; i < tasks.length; i++) {
      console.log(`Task #${i + 1}: ${tasks[i].taskName}`);
    }
  } catch (error) {
    console.log(error);
  }
};
// TODO borrar todos los consolge log que no coressponden

// TODO el json tiene un error al borrar tareas cuando no queda ninguna
// TODO agregar status al modelo de mongo

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
      console.log('selected index::', response.selectedIndex);
      term.red('\nTask deleted successfully \n');
      await foundUser.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username, task) => {};
const updateTaskSelected = async (username, task) => {};
const finishTaskSelected = async (username, task) => {};

module.exports = {

  createUser,
  userCheck,
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  updateTaskSelected,
};
