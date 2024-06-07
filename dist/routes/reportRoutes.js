"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/reportRoutes.ts
const express_1 = __importDefault(require("express"));
const reportController_1 = require("../controllers/reportController");
const router = express_1.default.Router();
router.get('/report', reportController_1.generateReport);
router.get('/excel-report', reportController_1.generateExcelReport); // Define new route for Excel report
exports.default = router;
//# sourceMappingURL=reportRoutes.js.map