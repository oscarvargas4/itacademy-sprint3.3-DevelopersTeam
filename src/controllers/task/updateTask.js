const { writeFile, readFile, unlink } = require("fs/promises");
const term = require("terminal-kit").terminal;

const updateTask = async (username, id, update) => {
  try {
    let indexArray = null;
    let data = JSON.parse(
      await readFile("./src/database/database.JSON", "utf8")
    );
    let userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error("User not found");

    let task = await data.users[userIndex].tasks.find((task, index) => {
      if (task.id === id) {
        indexArray = index;
        return task;
      }
    });
    if (!task) throw new Error("Task not found");

    let updateTask = {
      id: task.id,
      description: update,
      createdAt: task.createdAt,
      updatedAt: new Date(),
    };
    data.users[userIndex].tasks[indexArray] = updateTask;
    data = JSON.stringify(data);
    await writeFile("./src/database/database.JSON", data);
  } catch (e) {
    console.log(e);
  }
};


// Update task with menu selection
const updateTaskSelected = async (username) => {
  try {
    let data = JSON.parse(
      await readFile("./src/database/database.JSON", "utf8")
    );
    let userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error("User not found");

    let tasks = await data.users[userIndex].tasks;
    let items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    term.black.bgGreen("Select a Tasks:\n");
    term.singleColumnMenu(items, (error, response) => {
      term("\n").eraseLineAfter.red(
        "#%s selected: %s \n",
        response.selectedIndex + 1,
        response.selectedText
      );

      if (error) throw new Error(error);

      term.black.bgGreen("Please enter new Task description:\n");
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
  updateTask,
  updateTaskSelected
};
