// src/models/TimesheetEntry.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Timesheet from './Timesheet';

class TimesheetEntry extends Model {
    public id!: string;
    public timesheetId!: string;
    public projectName!: string;
    public taskName!: string;
    public fromDate!: Date;
    public toDate!: Date;
}

TimesheetEntry.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        timesheetId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        projectName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fromDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        toDate: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'TimesheetEntry',
    }
);

export default TimesheetEntry;
