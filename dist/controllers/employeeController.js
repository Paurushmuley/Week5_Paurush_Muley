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
exports.logoutEmployee = exports.loginEmployee = exports.registerEmployee = void 0;
const employeeService_1 = require("../services/employeeService");
const Shift_1 = __importDefault(require("../models/Shift"));
const registerEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, assignedShiftHours, role } = req.body;
        const employee = yield (0, employeeService_1.register)(name, email, password, assignedShiftHours, role);
        res.status(201).json(employee);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.registerEmployee = registerEmployee;
const loginEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { token, employee } = yield (0, employeeService_1.login)(email, password);
        // Start shift upon successful login
        const shift = yield Shift_1.default.create({ employeeId: employee.id, startTime: new Date() });
        // Fetch shift details associated with the employee
        const shiftDetails = yield Shift_1.default.findOne({ where: { id: shift.id } });
        if (!shiftDetails) {
            // Handle case where shift details are not found
            return res.status(500).json({ error: 'Failed to retrieve shift details' });
        }
        // Calculate assigned shift hours
        const assignedShiftHours = yield Shift_1.default.getAssignedShiftHours(employee.id);
        res.status(200).json({ token, shiftDetails, assignedShiftHours });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.loginEmployee = loginEmployee;
const logoutEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.body;
        // Find the latest shift for the employee
        const shift = yield Shift_1.default.findOne({ where: { employeeId }, order: [['startTime', 'DESC']] });
        if (!shift) {
            return res.status(400).json({ error: 'No active shift found for the employee' });
        }
        // Update shift's end time
        shift.endTime = new Date();
        yield shift.save();
        // Calculate actual hours
        const actualHours = shift.actualHours;
        res.status(200).json({ message: 'Shift ended successfully', shift, actualHours });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.logoutEmployee = logoutEmployee;
//# sourceMappingURL=employeeController.js.map