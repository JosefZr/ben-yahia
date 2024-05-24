import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis || {};

globalForPrisma.prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV!== 'production') {
  globalForPrisma.prisma = globalForPrisma.prisma;
}

export const db = globalForPrisma.prisma;
