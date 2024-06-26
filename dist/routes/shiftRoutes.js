"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/shiftRoutes.ts
const express_1 = __importDefault(require("express"));
const shiftController_1 = require("../controllers/shiftController");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/start', authMiddleware_1.default, shiftController_1.startShift);
router.post('/end', authMiddleware_1.default, shiftController_1.endShift);
exports.default = router;
//# sourceMappingURL=shiftRoutes.js.map