import { PrismaClient } from '@prisma/client';

// import { getDatabaseUrl } from './helper';

declare global {
  // We need `var` to declare a global variable in TypeScript
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const db = process.env.DATABASE_URL;
if (!globalThis.prisma) {
  // console.log('db in prisma index.ts', db);
  globalThis.prisma = new PrismaClient({ datasourceUrl: db });
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    datasourceUrl: db,
  });

export const getPrismaClient = () => prisma;
