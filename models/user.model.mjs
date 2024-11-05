import { DataTypes, Model } from "sequelize";
import DatabaseSingleton from "../database/database.mjs";
import Group from '../models/group.model.mjs';
import bcrypt from 'bcrypt'

const sequelize = DatabaseSingleton.getInstance().connection;

class User extends Model {}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
    unique: true
  },
  uuid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  display_username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  TwoFactorAuth: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  steam_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  discord_token: {
    type: DataTypes.STRING,
    allowNull: true
  },
  register_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  activation_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_login_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  group: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Group,
      key: 'id'
    },
    defaultValue: 1
  }
}, {
  sequelize,
  modelName: "User",
  timestamps: false
});

User.belongsTo(Group, {foreignKey: 'group'});
Group.hasMany(User, {foreignKey: 'group'});

User.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt)
  }
});

User.prototype.checkPassword = async function (password)  {
  return await bcrypt.compare(password, this.password);
};

export default User;
