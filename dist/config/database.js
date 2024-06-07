"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Pool } from 'pg';
const sequelize_1 = require("sequelize");
const credentials_1 = __importDefault(require("../common/credentials"));
const sequelize = new sequelize_1.Sequelize({
    username: credentials_1.default.postgres.USERNAME,
    host: credentials_1.default.postgres.HOST,
    database: credentials_1.default.postgres.DATABASE,
    password: credentials_1.default.postgres.PASSWORD,
    port: credentials_1.default.postgres.DBPORT,
    //dialect 
    dialect: "postgres",
});
sequelize.authenticate()
    .then(() => {
    console.log('Database connection established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
exports.default = sequelize;
//# sourceMappingURL=database.js.map