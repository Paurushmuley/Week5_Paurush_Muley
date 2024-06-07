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
exports.generateExcelReport = exports.generateReport = void 0;
const Timesheet_1 = __importDefault(require("../models/Timesheet"));
const Shift_1 = __importDefault(require("../models/Shift"));
const exceljs_1 = __importDefault(require("exceljs"));
const generateReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query actual hours worked and assigned shift hours
        const reportData = yield Timesheet_1.default.findAll({
            include: [
                {
                    model: Shift_1.default,
                    attributes: ['actualHours'],
                },
            ],
            attributes: ['employeeId', 'createdAt'],
        });
        // Create Excel workbook and worksheet
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Report');
        // Add headers to worksheet
        worksheet.columns = [
            { header: 'Employee ID', key: 'employeeId', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Actual Hours', key: 'actualHours', width: 15 },
        ];
        // Add data to worksheet
        reportData.forEach((entry) => {
            var _a;
            worksheet.addRow({
                employeeId: entry.employeeId,
                date: entry.createdAt.toDateString(),
                actualHours: ((_a = entry.Shift) === null || _a === void 0 ? void 0 : _a.actualHours) || 0,
            });
        });
        // Generate Excel file
        const filePath = 'report.xlsx';
        yield workbook.xlsx.writeFile(filePath);
        // Send Excel file as response
        res.download(filePath);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.generateReport = generateReport;
const generateExcelReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Query actual hours worked and assigned shift hours
        const reportData = yield Timesheet_1.default.findAll({
            include: [
                {
                    model: Shift_1.default,
                    attributes: ['actualHours'],
                },
            ],
            attributes: ['employeeId', 'createdAt'],
        });
        // Create Excel workbook and worksheet
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet('Report');
        // Add headers to worksheet
        worksheet.columns = [
            { header: 'Employee ID', key: 'employeeId', width: 15 },
            { header: 'Date', key: 'date', width: 20 },
            { header: 'Actual Hours', key: 'actualHours', width: 15 },
        ];
        // Add data to worksheet
        reportData.forEach((entry) => {
            var _a;
            worksheet.addRow({
                employeeId: entry.employeeId,
                date: entry.createdAt.toDateString(),
                actualHours: ((_a = entry.Shift) === null || _a === void 0 ? void 0 : _a.actualHours) || 0,
            });
        });
        // Generate Excel file in memory
        const buffer = yield workbook.xlsx.writeBuffer();
        // Send Excel file as response
        res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.generateExcelReport = generateExcelReport;
//# sourceMappingURL=reportController.js.map