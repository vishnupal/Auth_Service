const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
  try {
    const user = await userService.create({
      email: req.body.email,
      password: req.body.password,
    });
    return res.status(201).json({
      data: user,
      success: true,
      err: {},
      message: 'User created successfully ',
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      err: error.explanation,
      message: error.message,
    });
  }
};

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(
      req.body.email,
      req.body.password
    );
    return res.status(200).json({
      data: response,
      success: true,
      err: {},
      message: 'Successfully Signin',
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: {},
      success: false,
      err: error.explanation,
      message: error.message,
    });
  }
};
const isAuthenticate = async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    const response = await userService.isAuthenticate(token);
    return res.status(200).json({
      data: response,
      success: true,
      err: {},
      message: 'token is valid',
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      err: error,
      message: 'Something gone wrong',
    });
  }
};
const isAdmin = async (req, res) => {
  try {
    console.log(req.body.id);
    const response = await userService.isAdmin(req.body.id);
    res.status(200).json({
      data: response,
      success: true,
      err: {},
      message: `User is ${response ? 'Admin' : 'Not Admin'}`,
    });
  } catch (error) {
    return res.status(500).json({
      data: {},
      success: false,
      err: error,
      message: 'Something gone wrong',
    });
  }
};

module.exports = {
  create,
  signIn,
  isAuthenticate,
  isAdmin,
};
