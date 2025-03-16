import { beforeAll, afterAll } from '@jest/globals';
import { prisma } from './src/services/prisma';

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});
