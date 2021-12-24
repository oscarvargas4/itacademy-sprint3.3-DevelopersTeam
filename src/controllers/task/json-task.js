const { writeFile, readFile, unlink } = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const term = require('terminal-kit').terminal;

const createTask = async (username) => {
  term.black.bgGreen('Please enter Task description:\n');
  try {
    const input = await term.inputField({}).promise;
    let data = await readFile('./src/database/database.JSON', 'utf8');
    data = JSON.parse(data);
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username.toLowerCase()) {
        return true;
      }
    });
    console.log('userIndex:::', userIndex);
    if (userIndex == -1) throw new Error('User not found');

    const newTask = {
      id: uuidv4(),
      description: input,
      createdAt: new Date(),
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
    let data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8'),
    );
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error('User not found');

    const tasks = await data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }
    // Hasta aca es readData

    term.black.bgGreen('\nSelect a Task:\n');
    const response = await term.singleColumnMenu(items).promise;

    console.log(response);

    term('\n').eraseLineAfter.red(
      '#%s selected: %s \n',
      response.selectedIndex + 1,
      response.selectedText,
    );

    const newTasks = tasks.filter(
      (task) => task.id != tasks[response.selectedIndex].id,
    );
    data.users[userIndex].tasks = newTasks;

    data = JSON.stringify(data);
    writeFile('./src/database/database.JSON', data).then(() => {
      term.red('Task deleted successfully \n');
    });
  } catch (error) {
    console.log(error);
  }
};

const seeAllTasks = async (username) => {
  try {
    const data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8'),
    );
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error('User not found');

    const tasks = await data.users[userIndex].tasks;
    term.red(`${username} is Tasks: \n`);
    for (let i = 0; i < tasks.length; i++) {
      console.log(`Task #${i + 1}: ${tasks[i].description}`);
    }
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const seeSpecificTask = async (username) => {
  try {
    const data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8'),
    );
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error('User not found');

    const tasks = await data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    term.black.bgGreen('\nSelect a Task:\n');
    term.singleColumnMenu(items, (error, response) => {
      if (error) throw new Error(error);

      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText,
      );
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
const updateTask = async (username, id, update) => {
  try {
    let indexArray = null;
    let data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8'),
    );
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error('User not found');

    const task = await data.users[userIndex].tasks.find((task, index) => {
      if (task.id === id) {
        indexArray = index;
        return task;
      }
    });
    if (!task) throw new Error('Task not found');

    const updateTask = {
      id: task.id,
      description: update,
      createdAt: task.createdAt,
      updatedAt: new Date(),
    };
    data.users[userIndex].tasks[indexArray] = updateTask;
    data = JSON.stringify(data);
    await writeFile('./src/database/database.JSON', data);
  } catch (e) {
    console.log(e);
  }
};

// Update task with menu selection
const updateTaskSelected = async (username) => {
  try {
    const data = JSON.parse(
      await readFile('./src/database/database.JSON', 'utf8'),
    );
    const userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error('User not found');

    const tasks = await data.users[userIndex].tasks;
    const items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    term.black.bgGreen('Select a Tasks:\n');
    term.singleColumnMenu(items, (error, response) => {
      term('\n').eraseLineAfter.red(
        '#%s selected: %s \n',
        response.selectedIndex + 1,
        response.selectedText,
      );

      if (error) throw new Error(error);

      term.black.bgGreen('Please enter new Task description:\n');
      term.inputField((error, input) => {
        if (error) throw new Error(error);

        updateTask(username, tasks[response.selectedIndex].id, input)
          .then(() => {
            term.red(`\nTask updated to: \n"${input}"`);
            process.exit();
          });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createTask, deleteTask, seeAllTasks, seeSpecificTask, updateTaskSelected,
};
