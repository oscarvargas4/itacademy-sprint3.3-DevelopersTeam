const { readFile, writeFile } = require("fs/promises");
const dataTemplate = require("./databaseTemplate");


// Check if Database Exists
const checkDB = async() => {
    try {
        await readFile("src/database/database.JSON", "utf8");
        console.log("Database Checked");

    } catch (error) {
        try {
            await writeFile("src/database/database.JSON", dataTemplate);
            console.log("Database Created");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    checkDB
};