"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Employee_1 = __importDefault(require("./Employee"));
const Shift_1 = __importDefault(require("./Shift"));
const TimesheetEntry_1 = __importDefault(require("./TimesheetEntry"));
class Timesheet extends sequelize_1.Model {
    // Define associations
    static associate() {
        Timesheet.belongsTo(Employee_1.default, { foreignKey: 'employeeId' });
        Timesheet.belongsTo(Shift_1.default, { foreignKey: 'shiftId' });
        Timesheet.hasMany(TimesheetEntry_1.default, { foreignKey: 'timesheetId' });
    }
}
Timesheet.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    shiftId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Timesheet',
});
// In Timesheet model
Timesheet.hasMany(TimesheetEntry_1.default, { foreignKey: 'timesheetId' });
exports.default = Timesheet;
//# sourceMappingURL=Timesheet.js.map