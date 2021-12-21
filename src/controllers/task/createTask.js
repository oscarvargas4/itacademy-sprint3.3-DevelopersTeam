const { writeFile, readFile, unlink } = require("fs/promises");
const { v4: uuidv4 } = require('uuid');

const createTask = async (username, task) => {
  try {
    let data = JSON.parse(await readFile("./src/database/database.JSON", "utf8"));
    let userIndex = data.users.findIndex((user, index) => {
      if (user.username == username.toLowerCase()) {
        return true;
      }
    });
    if (userIndex == -1) throw new Error("User not found");

    let newTask = {
      id: uuidv4(),
      description: task,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    data.users[userIndex].tasks.push(newTask);
    data = JSON.stringify(data);
    await writeFile("./src/database/database.JSON", data);
  } catch (e) {
    console.log(e);
  }
};


module.exports = {
  createTask,
}
