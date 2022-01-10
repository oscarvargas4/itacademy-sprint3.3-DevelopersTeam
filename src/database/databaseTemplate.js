let dataTemplate = {
  users: [
    {
      username: 'admin',
      tasks: [
        {
          description: '',
          status: 'pending',
          createdAt: new Date(),
          startedAt: null,
          finishedAt: null,
          updateAt: new Date(),
        },
      ],
    },
  ],
};

dataTemplate = JSON.stringify(dataTemplate);

module.exports = dataTemplate;
