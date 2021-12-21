let dataTemplate = {
    users: [
        {
            username: "admin",
            tasks: [
                {
                    description: "",
                    createdAt: new Date(),
                    updateAt: new Date()
                }
            ]
        }
    ]
};

dataTemplate = JSON.stringify(dataTemplate)

module.exports = dataTemplate