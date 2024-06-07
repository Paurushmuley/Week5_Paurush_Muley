// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import { register, login } from '../services/employeeService';
import Shift from '../models/Shift';

const registerEmployee = async (req: Request, res: Response) => {
    try {
        const { name, email, password, assignedShiftHours, role } = req.body;
        const employee = await register(name, email, password, assignedShiftHours, role);
        res.status(201).json(employee);
    } catch (error) {
        res.status(400).json({ error: error });
    }
};

const loginEmployee = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const { token, employee } = await login(email, password);

        // Start shift upon successful login
        const shift = await Shift.create({ employeeId: employee.id, startTime: new Date() });

        // Fetch shift details associated with the employee
        const shiftDetails = await Shift.findOne({ where: { id: shift.id } });

        if (!shiftDetails) {
            // Handle case where shift details are not found
            return res.status(500).json({ error: 'Failed to retrieve shift details' });
        }

        // Calculate assigned shift hours
        const assignedShiftHours = await Shift.getAssignedShiftHours(employee.id);

        res.status(200).json({ token, shiftDetails, assignedShiftHours });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};
const logoutEmployee = async (req: Request, res: Response) => {
    try {
        const { employeeId } = req.body;

        // Find the latest shift for the employee
        const shift = await Shift.findOne({ where: { employeeId }, order: [['startTime', 'DESC']] });

        if (!shift) {
            return res.status(400).json({ error: 'No active shift found for the employee' });
        }

        // Update shift's end time
        shift.endTime = new Date();
        await shift.save();

        // Calculate actual hours
        const actualHours = shift.actualHours;

        res.status(200).json({ message: 'Shift ended successfully', shift, actualHours });
    } catch (error) {
        res.status(400).json({ error: error });
    }
};



export { registerEmployee, loginEmployee, logoutEmployee };
