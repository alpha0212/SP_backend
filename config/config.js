require("dotenv").config();
const env = process.env;
const development = {
  username: env.AWS_NAME,
  password: env.AWS_PW,
  database: env.AWS_DB,
  host: env.AWS_HOST,
  dialect: "mysql",
};
const test = {
  username: "root",
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: "mysql",
};
const production = {
  username: "root",
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: "mysql",
};
