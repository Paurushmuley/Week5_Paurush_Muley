// src/controllers/timesheetController.ts
import { Request, Response } from 'express';
import Timesheet from '../models/Timesheet';
import TimesheetEntry from '../models/TimesheetEntry';

const createTimesheet = async (req: Request, res: Response) => {
    try {
        const { employeeId, shiftId } = req.body;
        const timesheet = await Timesheet.create({ employeeId, shiftId });
        res.status(201).json(timesheet);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const createTimesheetEntry = async (req: Request, res: Response) => {
    try {
        const { timesheetId, projectName, taskName, fromDate, toDate } = req.body;
        const timesheetEntry = await TimesheetEntry.create({ timesheetId, projectName, taskName, fromDate, toDate });
        res.status(201).json(timesheetEntry);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};



export { createTimesheet, createTimesheetEntry, /* Other CRUD operations */ };
