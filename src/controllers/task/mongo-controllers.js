const User = require('../../database/mongo-model');

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

const userCheck = async (input) => {
  console.log('entra a userCheck');
  const inputLC = input.toLowerCase();
  try {
    console.log('input: ', input);
    const foundUser = await User.findOne({
      username: inputLC,
    });
    console.log('found user::,', foundUser);
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

const createTask = async (username, task) => {
  console.log('username from create task:::', username);
  // aca busca al usuario y solo tira error si no lo encuentra.
  try {
    const foundUser = await User.findOne({
      username,
    });
    if (foundUser === null) throw new Error('User not found');

    // aca crea la nueva tarea

    const newTask = {
      taskName: task,
      // TODO provisional, deberia poder seleccionarse de consola
      start_date: Date.now(),
      end_date: Date.now(),
    };
    foundUser.tasks.push(newTask);
    await foundUser.save();
  } catch (e) {
    console.log(e);
  }
};

const deleteTask = async (username, task) => {};
const seeAllTasks = async (username, task) => {};
const seeSpecificTask = async (username, task) => {};
const updateTaskSelected = async (username, task) => {};

module.exports = {

  createUser,
  userCheck,
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  updateTaskSelected,

};
