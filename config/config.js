import 'dotenv/config';

export default {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABBASE_HOST,
    dialect: 'mysql',
    seederStorage: "sequelize",
    migrationStorage: "sequelize",
  },
};
