import request from 'supertest';
import express, { json, Express } from 'express';
import cors from 'cors';
import routes from '../routes';
import { FRONT_URL } from '../utils/constants';
import { prisma } from '../services/prisma';
import { errorHandler } from '../middleware/errorHandler';

describe('Task Controller', () => {
  let taskId: string;
  let app: Express;

  beforeAll(async () => {
  app = express();

    app.use(
      cors({
        origin: FRONT_URL,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      }),
    );
    app.use(json());
    app.use('/', routes);
    app.use(errorHandler);
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('should create a task', async () => {
    const response = await request(app)
      .post('/tasks')
      .send({ title: 'Test Task', description: 'Task description' });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
    taskId = response.body.data.id;
  });

  test('should retrieve all tasks', async () => {
    const response = await request(app).get('/tasks');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('should retrieve a task by ID', async () => {
    const response = await request(app).get(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.id).toBe(taskId);
  });

  test('should update a task', async () => {
    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send({ title: 'Updated Task' });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Updated Task');
  });

  test('should delete a task', async () => {
    const response = await request(app).delete(`/tasks/${taskId}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  test('should return 404 for non-existent task', async () => {
    const response = await request(app).get('/tasks/nonexistent-id');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Task not found');
  });
});
