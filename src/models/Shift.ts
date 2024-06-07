// src/models/Shift.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Employee from './Employee';

class Shift extends Model {
    public id!: string;
    public employeeId!: string;
    public startTime!: Date;
    public endTime!: Date | null;

    // Define actualHours as a virtual field
    get actualHours(): number {
        if (!this.endTime) return 0;
        const diff = this.endTime.getTime() - this.startTime.getTime();
        return diff / (1000 * 60 * 60); // Convert milliseconds to hours
    }

    // Define static method to calculate assigned shift hours
    static async getAssignedShiftHours(employeeId: string): Promise<number> {
        const employee = await Employee.findByPk(employeeId);
        if (!employee) throw new Error('Employee not found');
        return employee.assignedShiftHours;
    }
}

Shift.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        employeeId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        startTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'Shift',
    }
);


export default Shift;
Shift.belongsTo(Employee, { foreignKey: 'employeeId' });
