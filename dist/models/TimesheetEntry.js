"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/TimesheetEntry.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
class TimesheetEntry extends sequelize_1.Model {
}
TimesheetEntry.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    timesheetId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    projectName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    taskName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fromDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    toDate: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'TimesheetEntry',
});
exports.default = TimesheetEntry;
//# sourceMappingURL=TimesheetEntry.js.map