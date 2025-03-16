import { Prisma, Task } from '@prisma/client';
import { prisma } from '../prisma';

export class TaskService {
  static getAll = async (): Promise<Task[]> => {
    return await prisma.task.findMany({
      include: {
        subtasks: true,
      },
    });
  };

  static create = async (data: Prisma.TaskCreateInput): Promise<Task> => {
    return await prisma.task.create({ data });
  };

  static getById = async (id: string): Promise<Task | null> => {
    return await prisma.task.findUnique({
      where: { id },
      include: {
        subtasks: true,
      },
    });
  };

  static delete = async (id: string): Promise<Task> => {
    return await prisma.task.delete({ where: { id } });
  };

  static addSubtask = async (
    parentId: string,
    data: Prisma.TaskCreateInput,
  ): Promise<Task> => {
    return await prisma.task.create({
      data: {
        ...data,
        parent: { connect: { id: parentId } },
      },
      include: { subtasks: true },
    });
  };

  static update = async (
    id: string,
    data: Prisma.TaskUpdateInput,
  ): Promise<Task | null> => {
    return await prisma.task.update({
      where: { id },
      data,
    });
  };
}
