import { Request, Response } from 'express';
import Shift from '../models/Shift';

const startShift = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.body;
        const shift = await Shift.create({ employeeId, startTime: new Date() });
        res.status(201).json(shift);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const endShift = async (req: Request, res: Response) => {
    try {
        const { shiftId } = req.params;
        const shift = await Shift.findByPk(shiftId);
        if (!shift) throw new Error('Shift not found');
        if (shift.endTime) throw new Error('Shift already ended');

        shift.endTime = new Date();
        await shift.save();

        res.status(200).json(shift);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const getShiftData = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.params;

        // Fetch shift data associated with the employee
        const shiftData = await Shift.findAll();

        if (!shiftData || shiftData.length === 0) {
            return res.status(404).json({ message: 'Shift data not found for the employee' });
        }

        res.status(200).json(shiftData);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};
export { startShift, endShift,  getShiftData };
