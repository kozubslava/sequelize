'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.order, {
        foreignKey : 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  User.init({
    firstName:{
      type: DataTypes.STRING(80),
      field: 'first_name',
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    lastName:{
      type: DataTypes.STRING(80),
      field: 'last_name',
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: true,
        notEmpty: true,
        isEmail: true
      }
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true
      }
    },
    isMale: {
      type: DataTypes.BOOLEAN,
      field: 'is_male',
    },
    birthday: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true,
        isValidDate (value) {
          if(isAfter(new Date(value), addYears(new Date(), -18))) {
            throw new Error('Invalid birthday. User must be adult')
          }
        }
      }
    },
    balance: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: true,
        isNumeric: true,
        min: 0
      }
    },
  },
  {
    sequelize,
    modelName: 'User',
    underscored: true,
    tableName: 'users',
  });
  return User;
};