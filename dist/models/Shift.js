"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/Shift.ts
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Employee_1 = __importDefault(require("./Employee"));
class Shift extends sequelize_1.Model {
    // Define actualHours as a virtual field
    get actualHours() {
        if (!this.endTime)
            return 0;
        const diff = this.endTime.getTime() - this.startTime.getTime();
        return diff / (1000 * 60 * 60); // Convert milliseconds to hours
    }
    // Define static method to calculate assigned shift hours
    static getAssignedShiftHours(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const employee = yield Employee_1.default.findByPk(employeeId);
            if (!employee)
                throw new Error('Employee not found');
            return employee.assignedShiftHours;
        });
    }
}
Shift.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    employeeId: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    endTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    sequelize: database_1.default,
    modelName: 'Shift',
});
Shift.belongsTo(Employee_1.default, { foreignKey: 'employeeId' });
exports.default = Shift;
//# sourceMappingURL=Shift.js.map