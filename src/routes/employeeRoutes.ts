
import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';
import { registerEmployee, loginEmployee, logoutEmployee } from '../controllers/employeeController';

const router = Router();
router.post('/register', registerEmployee);
router.post('/login', loginEmployee);
router.post('/logout', authMiddleware, logoutEmployee);
export default router;
