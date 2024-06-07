
import express from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { createTimesheet, createTimesheetEntry, } from '../controllers/timesheetController';

const router = express.Router();



router.post('/', authMiddleware, createTimesheet);
router.post('/entries', authMiddleware, createTimesheetEntry);
// Define other routes for CRUD operations

export default router;
