"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const employeeController_1 = require("../controllers/employeeController");
const router = (0, express_1.Router)();
router.post('/register', employeeController_1.registerEmployee);
router.post('/login', employeeController_1.loginEmployee);
router.post('/logout', authMiddleware_1.default, employeeController_1.logoutEmployee);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map