
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Employee from './Employee';
import Shift from './Shift';
import TimesheetEntry from './TimesheetEntry';

class Timesheet extends Model {
    public id!: string;
    public employeeId!: string;
    public shiftId!: string;

    // Define associations
    static associate() {
        Timesheet.belongsTo(Employee, { foreignKey: 'employeeId' });
        Timesheet.belongsTo(Shift, { foreignKey: 'shiftId' });
        Timesheet.hasMany(TimesheetEntry, { foreignKey: 'timesheetId' });
    }
}

Timesheet.init(
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
        shiftId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Timesheet',
    }
);
// In Timesheet model
Timesheet.hasMany(TimesheetEntry, { foreignKey: 'timesheetId' });


export default Timesheet;
