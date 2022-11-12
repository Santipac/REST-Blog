import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import config from './config';

export const prisma = new PrismaClient();
const server = express();
prisma.$connect();

server.use(cors());
server.use(express.json());

server.listen(config.PORT, () => {
  console.clear();
  console.log(`🚀 Server listening on port ${config.PORT}`);
});
