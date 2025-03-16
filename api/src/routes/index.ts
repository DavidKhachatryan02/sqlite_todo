import express from 'express';
import taskRouter from './taskRoutes';

const router = express.Router();

router.use('/tasks', taskRouter);

export default router;
