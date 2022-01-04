const { writeFile, readFile } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const term = require('terminal-kit').terminal;

// Create File
const userCheck = async (input) => {
  try {
    let data = await readFile('src/database/database.JSON', 'utf8');
    data = JSON.parse(data);
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == input.toLowerCase()) {
        return true;
      }
    });

    if (userIndex == -1) {
      const newUser = {
        username: input.toLowerCase(),
        tasks: [],
      };

      data.users.push(newUser);
      data = JSON.stringify(data);
      await writeFile('src/database/database.JSON', data);

      console.log('New User created!');
    }
  } catch (error) {
    console.log(error);
  }
};

// Helper methods //TODO talvez no deberian estar aca
const getData = async () => {
  try {
    const data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8')
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

const getIndex = (data, username) => {
  const userIndex = data.users.findIndex((user) => user.username === username);
  return userIndex;
};

// Controladores

const createTask = async (username) => {
  term.black.bgGreen('Please enter Task description:\n');
  try {
    const input = await term.inputField({}).promise;
    let data = await getData();
    const userIndex = getIndex(data, username);

    const newTask = {
      id: uuidv4(),
      description: input,
      status: 'pending',
      createdAt: new Date(),
      startedAt: null,
      finishedAt: null,
      updatedAt: new Date(),
    };

    data.users[userIndex].tasks.push(newTask);
    data = JSON.stringify(data);

    await writeFile('./src/database/database.JSON', data);
    term.red('\nTask created\n');
  } catch (e) {
    console.log(e);
  }
};

const deleteTask = async (username) => {
  try {
    let data = await getData();
    const userIndex = getIndex(data, username);

    const { tasks } = data.users[userIndex];
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }
    // Hasta aca es readData
    if (items.length > 0) {
      term.black.bgGreen('\nSelect a Task:\n');
      const response = await term.singleColumnMenu(items).promise;

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText
      );

      const newTasks = tasks.filter(
        (task) => task.id != tasks[response.selectedIndex].id
      );
      data.users[userIndex].tasks = newTasks;

      data = JSON.stringify(data);
      await writeFile('./src/database/database.JSON', data);
      term.red('\nTask deleted successfully \n');
    } else {
      term.red('\nNo tasks to delete icon \n');
    }
  } catch (error) {
    console.log(error);
  }
};

const seeAllTasks = async (username) => {
  try {
    const data = await getData();
    const userIndex = getIndex(data, username);

    const { tasks } = data.users[userIndex];
    term.red(`${username} is Tasks:\n`);
    for (let i = 0; i < tasks.length; i++) {
      console.log(`Task #${i + 1}: ${tasks[i].description}`);
    }
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username) => {
  try {
    const data = await getData();
    const userIndex = getIndex(data, username);

    const { tasks } = data.users[userIndex];
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    term.black.bgGreen('\nSelect a Task:\n');
    const response = await term.singleColumnMenu(items).promise;
    term.bold(`\nID: ${tasks[response.selectedIndex].id} \n`);
    term.bold(`Description : ${tasks[response.selectedIndex].description} \n`);
    term.bold(`Status : ${tasks[response.selectedIndex].status} \n`);
    term.bold(`Created : ${tasks[response.selectedIndex].createdAt} \n`);
    term.bold(`Started : ${tasks[response.selectedIndex].startedAt} \n`);
    term.bold(`Finished : ${tasks[response.selectedIndex].finishedAt} \n`);
    term.bold(`Updated : ${tasks[response.selectedIndex].updatedAt} \n`);
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async (username, id, update) => {
  try {
    let indexArray = null;
    let data = await getData();
    const userIndex = getIndex(data, username);

    const task = data.users[userIndex].tasks.find((task, index) => {
      if (task.id === id) {
        indexArray = index;
        return task;
      }
    });
    if (!task) throw new Error('Task not found');

    data.users[userIndex].tasks[indexArray] = {
      id: task.id,
      description: update,
      status: task.status,
      createdAt: task.createdAt,
      startedAt: task.startedAt,
      finishedAt: task.finishedAt,
      updatedAt: new Date(),
    };
    data = JSON.stringify(data);
    await writeFile('./src/database/database.JSON', data);
  } catch (e) {
    console.log(e);
  }
};

// Update task with menu selection
const updateTaskSelected = async (username) => {
  try {
    let data = await getData();
    const userIndex = getIndex(data, username);

    const tasks = data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    if (items.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      term.black.bgGreen('\nSelect a Task for update:\n');
      var response = await term.singleColumnMenu(items).promise;
      term.black.bgGreen('Please enter new Task description:\n');
      var input = await term.inputField().promise;

      await updateTask(username, tasks[response.selectedIndex].id, input).then(
        () => {
          term.red(`\nTask updated to: "${input}"\n`);
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// Start Task
const startTask = async (username, id) => {
  try {
    let indexArray = null;
    let data = await getData();
    const userIndex = getIndex(data, username);

    const task = data.users[userIndex].tasks.find((task, index) => {
      if (task.id === id) {
        indexArray = index;
        return task;
      }
    });
    if (!task) throw new Error('Task not found');

    data.users[userIndex].tasks[indexArray] = {
      id: task.id,
      description: task.description,
      status: 'started',
      createdAt: task.createdAt,
      startedAt: new Date(),
      finishedAt: task.finishedAt,
      updatedAt: task.updatedAt,
    };
    data = JSON.stringify(data);
    await writeFile('./src/database/database.JSON', data);
  } catch (error) {
    console.log(error);
  }
};

// Start task with menu selection
const startTaskSelected = async (username) => {
  try {
    const data = await getData();
    const userIndex = getIndex(data, username);

    const tasks = data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    if (items.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      term.black.bgGreen('Which Task would you like to start?:\n');
      var response = await term.singleColumnMenu(items).promise;
      await startTask(username, tasks[response.selectedIndex].id);
      term.red(`\nTask finished successfully\n`);
    }
  } catch (error) {
    console.log(error);
  }
};

// Finish Task
const finishTask = async (username, id) => {
  try {
    let indexArray = null;
    let data = await getData();
    const userIndex = getIndex(data, username);

    const task = data.users[userIndex].tasks.find((task, index) => {
      if (task.id === id) {
        indexArray = index;
        return task;
      }
    });
    if (!task) throw new Error('Task not found');

    data.users[userIndex].tasks[indexArray] = {
      id: task.id,
      description: task.description,
      status: 'finished',
      createdAt: task.createdAt,
      startedAt: task.startedAt,
      finishedAt: new Date(),
      updatedAt: task.updatedAt,
    };
    data = JSON.stringify(data);
    await writeFile('./src/database/database.JSON', data);
  } catch (error) {
    console.log(error);
  }
};

// Finish task with menu selection
const finishTaskSelected = async (username) => {
  try {
    const data = await getData();
    const userIndex = getIndex(data, username);

    const tasks = data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    if (items.length === 0) {
      term.red('\n There are no tasks \n');
    } else {
      term.black.bgGreen('Which Task would you like to finish?:\n');
      var response = await term.singleColumnMenu(items).promise;
      await finishTask(username, tasks[response.selectedIndex].id);
      term.red(`\nTask finished successfully\n`);
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
