// src/models/Employee.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Employee extends Model {
    public id!: string;
    public name!: string;
    public email!: string;
    public password!: string;
    public assignedShiftHours!: number;
    public role!: 'SuperAdmin' | 'Manager' | 'Employee';
}

Employee.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        assignedShiftHours: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('SuperAdmin', 'Manager', 'Employee'),
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Employee',
    }
);

export default Employee;
