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
exports.getShiftData = exports.endShift = exports.startShift = void 0;
const Shift_1 = __importDefault(require("../models/Shift"));
const startShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.body;
        const shift = yield Shift_1.default.create({ employeeId, startTime: new Date() });
        res.status(201).json(shift);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.startShift = startShift;
const endShift = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shiftId } = req.params;
        const shift = yield Shift_1.default.findByPk(shiftId);
        if (!shift)
            throw new Error('Shift not found');
        if (shift.endTime)
            throw new Error('Shift already ended');
        shift.endTime = new Date();
        yield shift.save();
        res.status(200).json(shift);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.endShift = endShift;
const getShiftData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId } = req.params;
        // Fetch shift data associated with the employee
        const shiftData = yield Shift_1.default.findAll();
        if (!shiftData || shiftData.length === 0) {
            return res.status(404).json({ message: 'Shift data not found for the employee' });
        }
        res.status(200).json(shiftData);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.getShiftData = getShiftData;
//# sourceMappingURL=shiftController.js.map