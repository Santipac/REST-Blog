import { prisma } from '..';

export const dbConnection = async (): Promise<void> => {
  await prisma.$connect();
  console.log('🚀 DataBase is running!');
};
