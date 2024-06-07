"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const timesheetController_1 = require("../controllers/timesheetController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, timesheetController_1.createTimesheet);
router.post('/entries', authMiddleware_1.default, timesheetController_1.createTimesheetEntry);
// Define other routes for CRUD operations
exports.default = router;
//# sourceMappingURL=timesheetRoutes.js.map