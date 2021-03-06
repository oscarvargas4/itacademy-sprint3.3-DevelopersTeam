const term = require('terminal-kit').terminal;
const User = require('../../models/mysql-user-model');
const Task = require('../../models/mysql-task-model');

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
const getData = async () => {
  try {
    return await Task.findAll({
      where: {
        userId: idUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

// Controladores
const createTask = async (username) => {
  term.black.bgGreen('Please enter Task description:\n');
  try {
    const input = await term.inputField({}).promise;
    if (input.length > 0) {
      await Task.create({
        description: input,
        userId: idUser,
      });
      term.red('\nTask created\n');
    } else {
      term.red('\nTask not created - a description is needed\n');
    }
  } catch (e) {
    console.log(e);
  }
};

const deleteTask = async (username) => {
  try {
    let items = [];
    let id = [];

    const task = await getData();

    for (let i = 0; i < task.length; i++) {
      items[i] = task[i].dataValues.description;
      id[i] = task[i].dataValues.id;
    }

    if (items.length > 0) {
      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      const destroy = await Task.destroy({
        where: {
          id: id[response.selectedIndex],
        },
      });

      if (destroy) {
        term.red(`\nTask deleted successfully\n`);
      } else {
        term.red(`\nTask not deleted\n`);
      }
    } else {
      term.red('\nNo tasks to delete icon\n');
    }
  } catch (error) {
    console.log(error);
  }
};

const seeAllTasks = async (username) => {
  try {
    const task = await getData();

    term.red(`${username} is Tasks: \n`);
    task.forEach((task, index) => {
      console.log(`Task #${index + 1}: ${task.dataValues.description}`);
    });
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username) => {
  try {
    let items = [];
    let id = [];

    const task = await getData();

    if (task.length > 0) {
      task.forEach((task, index) => {
        items[index] = task.dataValues.description;
        id[index] = task.dataValues.id;
      });

      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      const taskSpecific = await Task.findByPk(id[response.selectedIndex]);

      term.bold(`\nID: ${taskSpecific.dataValues.id} \n`);
      term.bold(`Description : ${taskSpecific.dataValues.description} \n`);
      term.bold(`Status : ${taskSpecific.dataValues.status} \n`);
      term.bold(`Created : ${taskSpecific.dataValues.createdAt} \n`);
      term.bold(`Started : ${taskSpecific.dataValues.startedAt} \n`);
      term.bold(`Finished : ${taskSpecific.dataValues.finishedAt} \n`);
      term.bold(`Updated : ${taskSpecific.dataValues.updatedAt} \n`);
    } else {
      term.red('\nNo tasks to see \n');
    }
  } catch (error) {
    console.log(error);
  }
};

const updateTaskSelected = async (username) => {
  try {
    let items = [];
    let id = [];

    const task = await getData();

    if (task.length > 0) {
      task.forEach((task, index) => {
        items[index] = task.dataValues.description;
        id[index] = task.dataValues.id;
      });

      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      term.black.bgGreen('Please enter Task description:\n');
      const input = await term.inputField({}).promise;

      if (input.length > 0) {
        const taskForUpdate = await Task.findByPk(id[response.selectedIndex]);
        await taskForUpdate.update({
          description: input,
        });
        term.red('\nTask updated\n');
      } else {
        term.red('\nTask not created - a description is needed\n');
      }
    } else {
      term.red('\nNo tasks to update \n');
    }
  } catch (error) {
    console.log(error);
  }
};

// Start task with menu selection
const startTaskSelected = async (username) => {
  try {
    let items = [];
    let id = [];

    const task = await getData();

    if (task.length > 0) {
      task.forEach((task, index) => {
        items[index] = task.dataValues.description;
        id[index] = task.dataValues.id;
      });

      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      const taskForUpdate = await Task.findByPk(id[response.selectedIndex]);
      await taskForUpdate.update({
        status: 'started',
        startedAt: new Date(),
      });
      term.red('\nTask started\n');
    } else {
      term.red('\nNo tasks to start \n');
    }
  } catch (error) {
    console.log(error);
  }
};

// Finish task with menu selection
const finishTaskSelected = async (username) => {
  try {
    let items = [];
    let id = [];

    const task = await getData();

    if (task.length > 0) {
      task.forEach((task, index) => {
        items[index] = task.dataValues.description;
        id[index] = task.dataValues.id;
      });

      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      const taskForUpdate = await Task.findByPk(id[response.selectedIndex]);
      await taskForUpdate.update({
        status: 'finished',
        finishedAt: new Date(),
      });
      term.red('\nTask finished\n');
    } else {
      term.red('\nNo tasks to finish \n');
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userCheck,
  createTask,
  deleteTask,
  seeAllTasks,
  seeSpecificTask,
  updateTaskSelected,
  startTaskSelected,
  finishTaskSelected,
};
