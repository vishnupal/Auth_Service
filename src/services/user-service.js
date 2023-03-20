const { JWT_KEY } = require('../config/serverConfig');
const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');
class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }
  async create(data) {
    try {
      const user = await this.userRepository.create(data);
      return user;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw error;
      }
      console.log('Something gone wrong with Service layer');
      throw error;
    }
  }
  async signIn(email, plainPassword) {
    try {
      // step-1 fetch user using email
      const user = await this.userRepository.getByEmail(email);
      // console.log(user);
      // step-2 check plainPassword with encrypted password

      const passwordMatch = this.checkPassword(plainPassword, user.password);
      if (!passwordMatch) {
        console.log("password doesn't match");
        throw { error: 'Incorrect   Password' };
      }
      const newJWT = this.createToken({ email: user.email, id: user.id });
      return newJWT;
    } catch (error) {
      if (error.name === 'AttributeNotFound') {
        throw error;
      }
      console.log('Something gone wrong with signIn process');
      throw error;
    }
  }

  async isAuthenticate(token) {
    try {
      const response = this.verifyToken(token);
      if (!response) {
        throw { error: 'Invalid token' };
      }
      const user = await this.userRepository.getByID(response.id);
      if (!user) {
        throw { error: 'User not found' };
      }
      return user.id;
    } catch (error) {
      console.log('Something gone wrong with token verification');
      throw error;
    }
  }
  async isAdmin(userId) {
    try {
      return await this.userRepository.isAdmin(userId);
    } catch (error) {
      console.log('Something gone wrong with service layer');
      throw error;
    }
  }
  createToken(user) {
    try {
      const token = jwt.sign(user, JWT_KEY, { expiresIn: '1d' });
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
  checkPassword(userInputPlainPassword, encryptedPassword) {
    try {
      return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
    } catch (error) {
      console.log('Something went wrong in password comparison');
      throw error;
    }
  }
}

module.exports = UserService;
