# Team of developers
#### IT-Academy

Created by Oscar, Mariano, Alejandro

## Features

- Create user
- Create task
- Delete task
- View all tasks
- View specific task
- Update task


## Technology

The project uses a number of open source projects to function properly:

- [Nodejs](https://nodejs.org/en/) - adventurous I/O for the backend.
- [Express](https://expressjs.com/es/) - fast node.js network application framework [@tjholowaychuk].
- [MongoDB](https://www.mongodb.com/es) - Database
- [Mongose](https://mongoosejs.com/) - MongoDB ORM
- [MYSQL](https://www.mysql.com/) - Database 
- [Sequelize](https://sequelize.org/) - Mysql ORM
- [Terminal-kit](https://www.npmjs.com/package/terminal-kit) - Terminal Browser

## Installation

The project requires [Node.js](https://nodejs.org/), mongodb and mysql to work.

Clone the repository on a computer, go to the project folder and run the installation of all packages.

```sh
clone https://github.com/oscarvargas4/itacademy-sprint3.3-DevelopersTeam
cd itacademy-sprint3.3-DevelopersTeam
npm i
```

## Start

Do you want to start the project?

Create an .env file in the root directory with the following code and fill out the configuration fields

````sh
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dev-teams
TEST_MONGODB_URI=mongodb://localhost:27017/dev-teams
MYSQL_PORT=port
MYSQL_HOST=localhost
MYSQL_USERNAME=user
MYSQL_PASSWORD=password
``````

JSON format:

````sh
npm run json
``````

Mongodb format:

````sh
npm run mongo
``````
(You need mongodb)

Mysql format:

````sh
npm run mysql
``````
(You need to start your mysql server, apache, laragon etc....)


## License

MIT

