const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      body: {},
      message: 'Something gone wrong',
      err: 'Invalid email or password',
      success: false,
    });
  }
  next();
};
const validateAdminUser = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      body: {},
      message: 'Something gone wrong',
      err: 'Invalid user ID',
      success: false,
    });
  }
  next();
};

module.exports = {
  validateUserAuth,
  validateAdminUser,
};
