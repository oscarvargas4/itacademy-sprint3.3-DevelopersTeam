let dataTemplate = {
    users: [
        {
            username: "admin",
            tasks: [
                {
                    description: "",
                    status: "started",
                    createdAt: new Date(),
                    updateAt: new Date(),
                    finishedAt: null
                }
            ]
        }
    ]
};

dataTemplate = JSON.stringify(dataTemplate)

module.exports = dataTemplate