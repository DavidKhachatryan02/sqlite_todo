import { Response, Request, NextFunction } from 'express';
import { TaskService } from '../services/TaskService';

export const GetTasks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tasks = await TaskService.getAll();
    res.status(200).json({
      message: 'Tasks retrieved successfully',
      data: tasks,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const GetTaskById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) throw { status: 400, message: 'ID is required' };

    const task = await TaskService.getById(id);
    if (!task) throw { status: 404, message: 'Task not found' };

    res.status(200).json({
      message: 'Task retrieved successfully',
      data: task,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const CreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body;
    const createdTask = await TaskService.create(data);

    res.status(201).json({
      message: 'Task created successfully',
      data: createdTask,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const AddSubtask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) throw { status: 400, message: 'Parent task ID is required' };

    const parentTask = await TaskService.getById(id);
    if (!parentTask) throw { status: 404, message: 'Parent task not found' };

    const subtask = await TaskService.addSubtask(id, data);

    res.status(201).json({
      message: 'Subtask added successfully',
      data: subtask,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const DeleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    if (!id) throw { status: 400, message: 'ID is required' };

    const task = await TaskService.getById(id);
    if (!task) throw { status: 404, message: 'Task not found' };

    await TaskService.delete(id);

    res.status(200).json({
      message: 'Task deleted successfully',
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateTask = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    if (!id) throw { status: 400, message: 'ID is required' };

    const existingTask = await TaskService.getById(id);
    if (!existingTask) throw { status: 404, message: 'Task not found' };

    const updatedTask = await TaskService.update(id, data);

    res.status(200).json({
      message: 'Task updated successfully',
      data: updatedTask,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
