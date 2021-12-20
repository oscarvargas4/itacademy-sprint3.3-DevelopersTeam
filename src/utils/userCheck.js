const { writeFile, readFile, unlink } = require("fs/promises");

// Create File
const userCheck = async (input) => {
  try {
    // let user = {
    //   username: input,
    //   tasks: []
    // };

    // let data = JSON.stringify(user);
    // await writeFile("src/database/database.JSON", data);

    let data = await readFile("src/database/database.JSON", "utf8");
    data = JSON.parse(data);
    let userIndex = data.users.findIndex((user, index) => {
      if(user.username == input.toLowerCase()) {
        return true;
      }
    });

    if (userIndex == -1) {
      let newUser = {
        username: input.toLowerCase(),
        tasks: []
      };

      data.users.push(newUser)
      data = JSON.stringify(data);
      await writeFile("src/database/database.JSON", data);

      console.log("New User created!");
    } else {
      console.log(userIndex);
    }

    
  } catch (error) {
    console.log(error);
  }
};

userCheck("oscar1")

// ? Read File - Read File is not necessary 
// readFile("src/database/database.JSON", "utf8").then((data) => {
//     console.log(data);
// });

// ? Update File

// ? Delete File
// unlink("src/database/database.JSON").then(() => console.log("File deleted"));

module.exports = {
  userCheck,
};
