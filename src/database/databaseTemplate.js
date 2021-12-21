let dataTemplate = {
    users: [
        {
            username: "admin",
            tasks: [
                "Work with the project",
                "Start a business"
            ]
        }
    ]
};

dataTemplate = JSON.stringify(dataTemplate)

module.exports = dataTemplate