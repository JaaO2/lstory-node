import { DataTypes, Model } from "sequelize";
import DatabaseSingleton from "../database/database.mjs"; 

const sequelize = DatabaseSingleton.getInstance().connection;

class Group extends Model {}

Group.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: true,
    },
  },
  color: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue: '000000',
    validate: {
        notEmpty: true,
    },
  },
  order: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 100,
    validate: {
        notEmpty: true,
    },
  },

}, {
  sequelize,
  modelName: "Group",
  timestamps: false
});

export default Group;