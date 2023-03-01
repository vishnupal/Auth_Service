const express = require('express');
const bodyParser = require('body-parser');

const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');
const UserService = require('./services/user-service');

const app = express();

const prepareAndStartServer = async () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api', apiRoutes);

  app.listen(PORT, () => {
    console.log(`Server Started on Port : ${PORT}`);
  });

  const service = new UserService();
  // const token = service.createToken({ email: 'vishn@api.com', id: 1 });
  // console.log('new token is', token);
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZpc2huQGFwaS5jb20iLCJpZCI6MSwiaWF0IjoxNjc3NjU5NTEyLCJleHAiOjE2Nzc2NjMxMTJ9.E4QHvMSqKIx121OwwbfcGjQJMYUbWGwJJkytYX4Rp6Y';
  const result = service.verifyToken(token);
  console.log(result);
};

prepareAndStartServer();
