const { writeFile, readFile, unlink } = require("fs/promises");
const term = require("terminal-kit").terminal;

const seeSpecificTask = async (username) => {
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
    console.log(tasks);
    let items = [];
    for (let i = 0; i < tasks.length; i++) {
      items[i] = tasks[i].description;
    }

    term.black.bgGreen("\nSelect a Tasks:\n");
    term.singleColumnMenu(items, (error, response) => {
      term("\n").eraseLineAfter.red(
        "#%s selected: %s \n",
        response.selectedIndex + 1,
        response.selectedText
      );

      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};


module.exports = { seeSpecificTask };
