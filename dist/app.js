"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const shiftRoutes_1 = __importDefault(require("./routes/shiftRoutes"));
const timesheetRoutes_1 = __importDefault(require("./routes/timesheetRoutes"));
// import report from './routes/reportRoutes';
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/employees', employeeRoutes_1.default);
app.use('/shifts', shiftRoutes_1.default);
app.use('/timesheets', timesheetRoutes_1.default);
// app.use('/reports', report);
const PORT = process.env.PORT || 3000;
database_1.default.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=app.js.map