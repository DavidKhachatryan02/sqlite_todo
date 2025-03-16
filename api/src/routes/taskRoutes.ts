import express from 'express';
import * as TaskController from '../controllers/TaskController';
import { validation } from '../middleware/validation';
import { createTaskSchema, updateTaskSchema } from '../validation/taskSchema';

const router = express.Router();

router.get('', TaskController.GetTasks);
router.get('/:id', TaskController.GetTaskById);
router.post('', validation(createTaskSchema), TaskController.CreateTask);
router.put('/:id', validation(updateTaskSchema), TaskController.UpdateTask);
router.delete('/:id', TaskController.DeleteTask);
router.post(
  '/:id/subtasks',
  validation(createTaskSchema),
  TaskController.AddSubtask,
);

export default router;
