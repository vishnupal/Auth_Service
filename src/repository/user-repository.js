const { User, Role } = require('../models/index');
const ValidationError = require('../utils/validation-error');
class UserRepository {
  async create(data) {
    try {
      const user = await User.create(data);
      return user;
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        throw new ValidationError(error);
      }
      console.log(error.errors);
      console.log('Something went  wrong on repository layer  ');
      throw error;
    }
  }
  async delete(userId) {
    try {
      await User.destroy({
        where: {
          id: userId,
        },
      });
      return true;
    } catch (error) {
      console.log('Something went  wrong on repository layer  ');
      throw error;
    }
  }

  async getByID(userId) {
    try {
      const user = await User.findByPk(userId, {
        attributes: ['email', 'id'],
      });
      return user;
    } catch (error) {
      console.log('Something went  wrong on repository layer  ');
      throw error;
    }
  }
  async getByEmail(email) {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
      return user;
    } catch (error) {
      console.log('Something went  wrong on repository layer  ');
      throw error;
    }
  }

  async isAdmin(userId) {
    try {
      const user = await User.findByPk(userId);
      const role = await Role.findOne({
        where: {
          name: 'ADMIN',
        },
      });
      return user.hasRole(role);
    } catch (error) {
      console.log('Something went  wrong on repository layer  ');
      throw error;
    }
  }
}

module.exports = UserRepository;
