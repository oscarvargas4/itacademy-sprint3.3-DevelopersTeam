const { writeFile, readFile, unlink } = require("fs/promises");

const updateTask = async (username, taskSearch, update) => {
  try {
    var indexArray = null;
    let data = JSON.parse(await readFile("../database/database.JSON", "utf8"));
    let userIndex = data.users.findIndex((user, index) => {
      if (user.username == username) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error("User not found");

    let task = await data.users[userIndex].tasks.find((task, index) => {
      if (task.description == taskSearch) {
        indexArray = index;
        return index;
      }
    });
    if (!task) throw new Error("Task not found");

    let updateTask = {
      description: update,
      created: task.createdAt,
      updatedAt: new Date(),
    };
    data.users[userIndex].tasks[indexArray] = updateTask;
    data = JSON.stringify(data);
    await writeFile("../database/database.JSON", data);
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  updateTask,
};
updateTask("oscar1", "test", "r13131");
