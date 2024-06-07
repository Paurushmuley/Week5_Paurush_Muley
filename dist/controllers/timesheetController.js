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
exports.createTimesheetEntry = exports.createTimesheet = void 0;
const Timesheet_1 = __importDefault(require("../models/Timesheet"));
const TimesheetEntry_1 = __importDefault(require("../models/TimesheetEntry"));
const createTimesheet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { employeeId, shiftId } = req.body;
        const timesheet = yield Timesheet_1.default.create({ employeeId, shiftId });
        res.status(201).json(timesheet);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.createTimesheet = createTimesheet;
const createTimesheetEntry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { timesheetId, projectName, taskName, fromDate, toDate } = req.body;
        const timesheetEntry = yield TimesheetEntry_1.default.create({ timesheetId, projectName, taskName, fromDate, toDate });
        res.status(201).json(timesheetEntry);
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.createTimesheetEntry = createTimesheetEntry;
//# sourceMappingURL=timesheetController.js.map