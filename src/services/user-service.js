const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      console.log('Something gone wrong with Service layer');
      throw error;
    }
  }
  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
      return token;
    } catch (error) {
      console.log('Something gone wrong with token creation');
      throw error;
    }
  }
  verifyToken(token) {
    try {
      const result = jwt.verify(token, JWT_KEY);
      return result;
    } catch (error) {
      console.log('Something gone wrong with token validation');
      throw error;
    }
  }
}

module.exports = UserService;
