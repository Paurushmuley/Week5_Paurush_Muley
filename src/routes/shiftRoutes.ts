// src/routes/shiftRoutes.ts
import express from 'express';
import { startShift, endShift } from '../controllers/shiftController';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/start', authMiddleware, startShift);
router.post('/end', authMiddleware, endShift);

export default router;
