const { writeFile, readFile, unlink } = require("fs/promises");
const term = require("terminal-kit").terminal;

const seeAllTasks = async (username) => {
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
    term.red(`${username} is Tasks: \n`);
    for (let i = 0; i < tasks.length; i++) {
        console.log(`Task #${i+1}: ${tasks[i].description}`);
    }
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { seeAllTasks };
