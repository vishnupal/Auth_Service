const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const UserRepository = require('./repository/user-repository');

// const userRepository = new UserRepository();
const app = express();

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);
  // const a = await userRepository.getByID(3);
  // console.log(a);
  app.listen(PORT, () => {
    console.log(`Server Started on Port : ${PORT}`);
  });
};

prepareAndStartServer();
