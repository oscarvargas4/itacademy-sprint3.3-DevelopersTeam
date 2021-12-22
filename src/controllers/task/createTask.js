const { writeFile, readFile, unlink } = require("fs/promises");
const { v4: uuidv4 } = require("uuid");
const term = require("terminal-kit").terminal;

const createTask = async (username) => {
  try {
    term.black.bgGreen("Please enter Task description:\n");
    term.inputField(async (error, input) => {
      try {
        let data = await readFile("./src/database/database.JSON", "utf8");
        data = JSON.parse(data);
        let userIndex = data.users.findIndex((user, index) => {
          if (user.username == username.toLowerCase()) {
            return true;
          }
        });
        if (userIndex == -1) throw new Error("User not found");

        let newTask = {
          id: uuidv4(),
          description: input,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        data.users[userIndex].tasks.push(newTask);
        data = JSON.stringify(data);

        await writeFile("./src/database/database.JSON", data);
        term.red("\nTask created\n");

        process.exit();
      } catch (error) {
        console.log(error);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  createTask,
};
