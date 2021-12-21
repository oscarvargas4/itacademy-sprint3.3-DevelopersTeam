let dataTemplate = {
    users: [
        {
            username: "admin",
            tasks: [
                {
                    description: "",
                    createdAt: Date.now(),
                    updateAt: Date.now()
                }
            ]
        }
    ]
};

dataTemplate = JSON.stringify(dataTemplate)

module.exports = dataTemplate