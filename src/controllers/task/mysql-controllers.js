const term = require("terminal-kit").terminal;
const User = require("../../models/mysql-user-model");
const Task = require("../../models/mysql-task-model");

var userData;
var idUser;

// Create File
const userCheck = async (input) => {
  try {
    userData = await User.findOrCreate({
      where: { username: input },
    });

    idUser = userData[0].dataValues.id;
    userData = userData[1].dataValues;
  } catch (e) {
    console.log(e);
  }
};

// Helper methods //TODO talvez no deberian estar aca
const getData = async () => {};

const getIndex = (data, username) => {
  const userIndex = data.users.findIndex((user) => user.username === username);
  return userIndex;
};

// Controladores

const createTask = async (username) => {
  term.black.bgGreen("Please enter Task description:\n");
  try {
    const input = await term.inputField({}).promise;
    await Task.create({
      taskName: input,
      userId: idUser,
    });
    term.red("\nTask created\n");
  } catch (e) {
    console.log(e);
  }
};

const deleteTask = async (username) => {};

const seeAllTasks = async (username) => {
  try {
    let i = 0;

    var task = await Task.findAll({
      where: {
        userId: idUser,
      },
    });

    term.red(`${username} is Tasks: \n`);
    task.forEach((task) => {
      console.log(`Task #${i + 1}: ${task.dataValues.taskName}`);
      i++;
    });

    // console.log(task)
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username) => {};
const updateTask = async (username, id, update) => {};

// Update task with menu selection
const updateTaskSelected = async (username) => {};

// Finish Task
const finishTask = async (username, id) => {};

// Finish task with menu selection
const finishTaskSelected = async (username) => {};

module.exports = {
  userCheck,
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  updateTaskSelected,
  finishTaskSelected,
};
