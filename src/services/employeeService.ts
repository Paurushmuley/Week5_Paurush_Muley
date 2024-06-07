import Employee from '../models/Employee';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const register = async (name: string, email: string, password: string, assignedShiftHours: number, role: 'SuperAdmin' | 'Manager' | 'Employee') => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const employee = await Employee.create({ name, email, password: hashedPassword, assignedShiftHours, role });
    return employee;
};

const login = async (email: string, password: string) => {
    const employee = await Employee.findOne({ where: { email } });
    if (!employee) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: employee.id, role: employee.role }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
    return { token, employee };
};

export { register, login };
