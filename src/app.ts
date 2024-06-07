
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import sequelize from './config/database';
import employeeRoutes from './routes/employeeRoutes';
import shiftRoutes from './routes/shiftRoutes';
import timesheetRoutes from './routes/timesheetRoutes';
// import report from './routes/reportRoutes';


dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/employees', employeeRoutes);
app.use('/shifts', shiftRoutes); 
app.use('/timesheets', timesheetRoutes);
// app.use('/reports', report);



const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
